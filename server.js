const express = require('express')
const app = express()
const port = 1717
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const defaultData = require('./defaultData')
const shortid = require('shortid')
const cors = require('cors')

const adapter = new FileSync('db.json')
const db = low(adapter)
const error = (res, status, text) => res.status(status).json(text).end()

app.use(cors())
db.defaults(defaultData).write()

app.use(express.json()) 

app.get('/me', (req, res) => {
  const token = req.get('X-Auth')
  const user = db.get('users').find({ token }).value()
  if (!user) return error(res, 403, 'Access is denied')

  res.send(user.response)
})


app.post('/login', (req, res) => {
  const { username, password } = req.body
  if (!username) return error(res, 400, 'username attribute is required')
  if (!password) return error(res, 400, 'password attribute is required')

  const user = db.get('users').find({ logData: { username, password } }).value()
  if (!user) return error(res, 403, 'incorrect login data')

  res.send({ token: user.token, data: user.response })
})

const passwordValidation = (password, res) => {
  if (!password) return error(res, 400, 'password attribute is required')
  if (password.length < 8) return error(res, 400, 'password should me more than 8 characters')
  if (password.length > 100) return error(res, 400, 'too long data')
  return null
}

app.post('/signup', (req, res) => {
  const { username, password } = req.body
  if (!username) return error(res, 400, 'username attribute is required')
  if (username.length < 3) return error(res, 400, 'password should me more than 3 characters')
  if (username.length > 100) return error(res, 400, 'too long data')
  passwordValidation(password, res)
  

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
})

app.post('/change-password', (req, res) => {
  const token = req.get('X-Auth')
  const user = db.get('users').find({ token })
  if (!user.value()) return error(res, 403, 'Access is denied')

  const { id, newPassword } = req.body
  if (!id) return error(res, 400, 'id attribute is required')
  const isExist = user.value()
  if (!isExist) return error(res, 400, 'user with this id don\'t exists')
  passwordValidation(newPassword, res)

  user.assign({ logData: { password: newPassword } }).write()
  res.status(200).json('success').end()
})


app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))