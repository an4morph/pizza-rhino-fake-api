const express = require('express')
const app = express()
const port = 1717
const defaultData = require('./defaultData')
const cors = require('cors')

const db = require('./db')
const error = require('./services/error')
const authRoutes = require('./routes/auth')

app.use(cors())
db.defaults(defaultData).write()

app.use(express.json()) 

app.get('/me', (req, res) => {
  const token = req.get('X-Auth')
  const user = db.get('users').find({ token }).value()
  if (!user) return error(res, 403, 'Access is denied')

  res.send(user.response)
})

app.post('/login', authRoutes.login)
app.post('/signup', authRoutes.signup)
app.post('/change-password', authRoutes.changePassword)

app.get('/pizza', (req, res) => {
  const pizza = db.get('pizza')
  res.send(pizza)
})

app.get('/drinks', (req, res) => {
  const drinks = db.get('drinks')
  res.send(drinks)
})

app.get('/salads', (req, res) => {
  const salads = db.get('salads')
  res.send(salads)
})


app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))