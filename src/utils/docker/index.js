module.exports = {
  ...require('./addProviderTags'),
  ...require('./buildProviderUrl'),
  ...require('./buildDockerCmd'),
  ...require('./buildDockerMounts'),
  ...require('./compose'),
  ...require('./getBuildArgs'),
  ...require('./getBuildTags'),
  ...require('./getDockerArgs'),
  ...require('./getOrBuildImage'),
  ...require('./getContainerConst'),
}