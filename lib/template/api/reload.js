const fs = require('fs');

module.exports = path => {
  require(path);
  fs.watch(path, () => {
    delete require.cache[path];
  });
  return (req, res, next) => {
    require(path)(req, res, next);
  };
};
