const db = require('../services/db')
const error = require('../services/error')
const shortid = require('shortid')
const validation = require('../services/validation')

const login = (req, res) => {
  const { username, password } = req.body
  if (!username) return error(res, 400, 'username attribute is required')
  if (!password) return error(res, 400, 'password attribute is required')

  const user = db.get('users').find({ logData: { username, password } }).value()
  if (!user) return error(res, 403, 'incorrect login data')

  res.send({ token: user.token, data: user.response })
}

const signup = (req, res) => {
  const { username, password } = req.body
  if (!username) return error(res, 400, 'username attribute is required')
  if (username.length < 3) return error(res, 400, 'password should me more than 3 characters')
  if (username.length > 100) return error(res, 400, 'too long data')
  validation.password(password, res)
  

  const existed = db.get('users').find({ data: { username } }).value()
  if (existed) return error(res, 400, 'user with this username already exists')

  const data = {
    token: `token_${shortid.generate()}`,
    response: { id:  shortid.generate(), username },
    logData: { username, password }
  }

  db.get('users').push(data).write()

  const user = db.get('users').find({ logData: { username, password } }).value()
  res.send({ token: user.token, data: user.response })
}

const changePassword = (req, res) => {
  const token = req.get('X-Auth')
  const user = db.get('users').find({ token })
  if (!user.value()) return error(res, 403, 'Access is denied')

  const { id, newPassword } = req.body
  if (!id) return error(res, 400, 'id attribute is required')
  const isExist = user.value()
  if (!isExist) return error(res, 400, 'user with this id don\'t exists')
  validation.password(newPassword, res)

  user.assign({ logData: { password: newPassword } }).write()
  res.status(200).json('success').end()
}

module.exports = {
  login,
  signup,
  changePassword
}