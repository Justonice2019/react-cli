#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const create = require('../lib/create')

const program = require('commander')
program
    .version(`@justonice/react-cli ${require('../package').version}`)
    .usage('<command> [options]')
program.command('create <app-name>')
    .description('create a new project')
    .action((name, options) => {
      create(name, options)
    })
program.parse()
