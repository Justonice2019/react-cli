const fs = require('fs-extra')
const path = require('path')

module.exports.writeFileTree = async function (destDir, files) {
  Object.keys(files).forEach((name) => {
    const filePath = path.join(destDir, name)
    fs.ensureDirSync(path.dirname(filePath))
    fs.writeFileSync(filePath, files[name])
  })
}
module.exports.writeFileDir = async function (destDir, srcDir) {
  return fs.copy(srcDir, destDir)
}
