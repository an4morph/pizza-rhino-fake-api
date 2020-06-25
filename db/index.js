const low = require('lowdb')
const path = require('path')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync(path.resolve(`${__dirname}/db.json`))

module.exports = low(adapter)