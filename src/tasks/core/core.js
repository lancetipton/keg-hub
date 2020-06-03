const { get } = require('jsutils')

/**
 * Default keg-core task, when a sub-task can not be found
 * @param {Object} args - arguments passed from the runTask method
 * @param {string} args.command - Initial command being run
 * @param {Array} args.options - arguments passed from the command line
 * @param {Object} args.tasks - All registered tasks of the CLI
 * @param {Object} globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const coreCommand = args => {
  const { command, options, tasks, globalConfig } = args

  console.log(`---------- Core command ----------`)

}

module.exports = {
  core: {
    name: 'core',
    alias: [ 'cor', 'cr' ],
    tasks: {
      ...require('./build'),
      ...require('./destroy'),
      ...require('./start'),
      ...require('./stop'),
    },
    action: coreCommand,
    description: 'Keg CLI core specific tasks',
    example: 'keg core <command> <options>'
  }
}