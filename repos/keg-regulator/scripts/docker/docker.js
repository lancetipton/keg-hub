#!/usr/bin/env node

require("./loadEnv")
const { spawnCmd } = require('spawn-cmd')
const cwd = process.cwd()

const runCmd = (cmd, args, env={}) => spawnCmd(cmd, {
  args,
  options: { env: { ...process.env, ...env } },
  cwd
})

const docker = (args, env) => runCmd('docker', args, env)
const compose = (args, env) => runCmd('docker-compose', args, env)

module.exports = {
  compose,
  docker,
  runCmd,
}