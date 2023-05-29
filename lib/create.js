const fs = require('fs-extra')
const path = require('path')
const chalk = require('chalk')
const inquirer = require('inquirer')
const Creator = require('./Creator')

async function create(projectName, options) {
  const cwd = process.cwd()
  const targetDir = path.resolve(cwd, projectName || '.')

  if (fs.existsSync(targetDir)) {
    const {action} = await inquirer.prompt([
      {
        name: 'action',
        type: 'list',
        message: `Target directory ${chalk.cyan(targetDir)} already exists. Pick an action:`,
        choices: [
          {name: 'Overwrite', value: 'overwrite'},
          {name: 'Cancel', value: false}
        ]
      }
    ])
    if (!action) {
      return
    }
    console.log(chalk.white(`Removing ${targetDir} ...`))
    const oldDir = await fs.readdir(targetDir)
    for (let i = 0; i < oldDir.length; i++) {
      const pathname = oldDir[i]
      if (pathname !== 'node_modules') {
        await fs.remove(path.resolve(targetDir, pathname))
      }
    }
  }
  const creator = new Creator(projectName, targetDir)
  await creator.create()
}

module.exports = create
