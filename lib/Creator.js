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
    const _pkg = {
      name,
      version: '1.0.0',
      private: true,
      ...pkg,
    }

    console.log(chalk.white(`Being created package.json ...`))

    await writeFileTree(context, {
      'package.json': JSON.stringify(_pkg, null, 2)
    })

    console.log(chalk.white(`Being create configuration file ...`))

    await writeFileDir(context, path.resolve(__dirname, './template'))
    console.log(chalk.white(`Complete creation! `))

    await execa('npm', ['install'], {
      cwd: context,
      stdio: 'inherit'
    })

    const { action } = await inquirer.prompt([
      {
        name: 'action',
        type: 'list',
        message: `Initialization is complete, please select !`,
        choices: [
          { name: 'start', value: 'start' },
          { name: 'cancel', value: false }
        ]
      }
    ])
    console.log(action)

    if (action === 'start') {
      await execa('npm', ['start'], {
        cwd: context,
        stdio: 'inherit'
      })
    }
  }
}
