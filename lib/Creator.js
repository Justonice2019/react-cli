const pkg = require('./pkg.json')
const {writeFileTree, writeFileDir} = require('./util/writeFile')
const chalk = require('chalk')
const path = require('path')
const execa = require('execa')
const inquirer = require('inquirer')
module.exports = class Creator {
  constructor(name, context) {
    this.name = name
    this.context = context
  }

  async create() {
    const {name, context} = this
    console.log(`✨  Creating project in ${chalk.yellow(context)}.`)
    const _pkg = {
      name,
      version: '1.0.0',
      private: true,
      ...pkg
    }

    console.log(chalk.white(`🗃  Initializing git repository...`))

    await writeFileTree(context, {
      'package.json': JSON.stringify(_pkg, null, 2)
    })

    console.log(chalk.white(`📄  Generating configuration file...`))

    await writeFileDir(context, path.resolve(__dirname, './template'))

    console.log('📦  Installing additional dependencies...')

    await execa('npm', ['install'], {
      cwd: context,
      stdio: 'inherit'
    })

    console.log(`🎉  Successfully created project ${chalk.yellow(name)}.`)

    const {action} = await inquirer.prompt([
      {
        name: 'action',
        type: 'list',
        message: `Initialization is complete, please select !`,
        choices: [
          {name: 'Start', value: 'start'},
          {name: 'Cancel', value: false}
        ]
      }
    ])
    if (!action) {
      console.log(`👉  Get started with the following commands:\n\n` +
          chalk.cyan(` ${chalk.gray('$')} cd ${name}\n`) +
          chalk.cyan(` ${chalk.gray('$')} npm start`)
      )
      return
    }
    await execa('npm', ['start'], {
      cwd: context,
      stdio: 'inherit'
    })
  }
}
