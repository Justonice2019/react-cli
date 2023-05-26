const fs = require('fs-extra')
const path = require('path')
const chalk = require('chalk')
const inquirer = require('inquirer')
const Creator = require('./Creator')
async function create(projectName, options) {
  const cwd = process.cwd()
  const targetDir = path.resolve(cwd, projectName || '.')

  if (fs.existsSync(targetDir)) {
    const answers = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'confirmRemove',
        message: `Directory: ${chalk.cyan(targetDir)} It already exists, Do you want to remove it?`,
      },
    ])
    if (answers.confirmRemove) {
      console.log(chalk.white(`Being removed ${projectName} ...`))
      const oldDir = await fs.readdir(targetDir)
      for (let i = 0; i < oldDir.length; i++) {
        const pathname = oldDir[i]
        if (pathname !== 'node_modules') {
          await fs.remove(path.resolve(targetDir, pathname))
        }
      }
      console.log(chalk.white(`Removal completed!`))
    }
  }
  const creator = new Creator(projectName, targetDir)
  await creator.create()
}

module.exports = create
