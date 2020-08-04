const db = require('../db')
const error = require('../services/error')
const shortid = require('shortid')

const login = (req, res) => {
  if (!req.body.username) return error(res, 400, 'username attribute is required')
  if (!req.body.password) return error(res, 400, 'password attribute is required')

  const loginData = { 
    username: req.body.username,
    password: req.body.password,
  }

  const user = db.get('users').find(loginData).value()
  if (!user) return error(res, 403, 'incorrect login data')

  const { username, id, token } = user
  res.send({ username, id, token })
}

const signup = (req, res) => {
  if (!req.body.username) return error(res, 400, 'username attribute is required')
  if (!req.body.password) return error(res, 400, 'password attribute is required')
  
  const isUserExists = !!db.get('users').find({ username: req.body.username }).value()
  if (isUserExists) return error(res, 400, 'user with this username already exists')

  const newUser = {
    token: `token_${shortid.generate()}`,
    id:  shortid.generate(),
    username: req.body.username
  }

  db.get('users').push({ ...newUser, password: req.body.password }).write()
  res.send(newUser)
}

const changePassword = (req, res) => {
  const user = db.get('users').find({ token: req.get('X-Auth') })
  if (!user.value()) return error(res, 403, 'Access is denied')
  
  const { newPassword } = req.body
  if (!newPassword) return error(res, 400, 'newPassword attribute is required')

  user.assign({ password: newPassword }).write()
  res.status(200).json('success').end()
}

const getMe = (res, req) => {
  const token = req.get('X-Auth')
  const user = db.get('users').find({ token }).value()
  if (!user) return error(res, 403, 'Access is denied')

  res.send(user.response)
}

module.exports = {
  login,
  signup,
  changePassword,
  getMe
}