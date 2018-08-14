const fs = require('fs')

module.exports = (app) => {
  fs.readdirSync(__dirname).forEach((file) => {
    if (file === 'index.js') return
    // eslint-disable-next-line import/no-dynamic-require
    require(`./${file.substr(0, file.indexOf('.'))}`)(app)
  })
}
