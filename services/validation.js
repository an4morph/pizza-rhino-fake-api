const error = require('./error')

const password = (password, res) => {
  if (!password) return error(res, 400, 'password attribute is required')
  if (password.length < 6) return error(res, 400, 'password should me more than 6 characters')
  if (password.length > 100) return error(res, 400, 'too long data')
  return null
}

module.exports = {
  password
}