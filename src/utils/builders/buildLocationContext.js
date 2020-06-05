const { get } = require('jsutils')
const { getPathFromConfig } = require('../globalConfig')
const { generalError, throwNoTapLink, throwNoConfigPath } = require('../error')
const { getTapPath } = require('../globalConfig/getTapPath')
const { getSetting } = require('../globalConfig/getSetting')
const { buildCmdContext } = require('./buildCmdContext')
const { buildTapContext } = require('./buildTapContext')
const { getGitKey } = require('../git/getGitKey')
const { getContainerConst } = require('../docker/getContainerConst')
const { DOCKER } = require('KegConst/docker')
const { IMAGES, LOCATION_CONTEXT } = DOCKER

/**
 * Gets the location where a docker command should be executed
 * @function
 * @param {Object} globalConfig - Global config object for the keg-cli
 * @param {Object} task - Current task being run
 * @param {string} context - Context to run the docker container in
 * @param {string} tap - Name of a linked tap in the globalConfig
 *
 * @returns {string} - The location where a command should be executed
 */
const getLocation = (globalConfig, task, context, tap) => {

  const hasTap = Boolean(context === 'tap' && tap)
  const isCore = Boolean(context === 'core' && task.name === 'build')
  const repoContext = Boolean(task.location_context === LOCATION_CONTEXT.REPO)
  
  let pathMethod = getPathFromConfig
  let locContext = 'containers'

  // Check if context is a Tap
  if(repoContext && context === 'tap' && tap){
    locContext = tap
    pathMethod = getTapPath
  }
  // Check if we are building keg-core
  else if(context === 'core' && task.name === 'build') locContext = 'core'

  // Get the location based on the pathMethod && locContext
  let location = pathMethod(globalConfig, locContext)

  // For the docker-sync / docker-compose command
  // Need their context to be in the keg-cli/containers folder
  locContext === 'containers' &&
    location &&
    ( location = `${ location }/${ context }` )

  // Return the location, or throw cause now path could be found
  return location || throwNoConfigPath(globalConfig, locContext)

}

/**
 * Gets the location and the context to run a docker container in
 * @function
 * @param {Object} globalConfig - Global config object for the keg-cli
 * @param {string} context - Context to run the docker container in
 * @param {string} defContext - default Context to use if context does not exist
 * @param {Object} [envs={}] - Group envs passed to docker command being run
 * @param {Object} task - Current task being run
 *
 * @returns {Object} - The location, context, and envs for the context
 */
const buildLocationContext = async ({ envs={}, globalConfig, params, task }) => {

  const { cmdContext, tap } = buildCmdContext({
    params,
    globalConfig,
    allowed: get(task, 'options.context.allowed', IMAGES),
    defContext: get(task, 'options.context.default')
  })

  // Build the location from containers path, and the context
  const location = getLocation(
    globalConfig,
    task,
    cmdContext,
    tap,
  )

  // Get the ENV vars for the command context
  // Merge with any passed in envs
  const contextEnvs = {
    // Experimental docker builds. Makes docker faster and cleaner
    ...(getSetting('docker.buildKit') ? { DOCKER_BUILDKIT: 1 } : {}),

    // Get the ENV context for the command
    ...getContainerConst(cmdContext, 'env', {}),

    // Get the ENVs for the Tap context if it exists
    ...( await buildTapContext({ globalConfig, cmdContext, tap, envs }) ),

    // Add the git key so we can call github within the image / container
    GIT_KEY: await getGitKey(globalConfig),
  }

  return { cmdContext, contextEnvs, location, tap }
}

module.exports = {
  buildLocationContext
}