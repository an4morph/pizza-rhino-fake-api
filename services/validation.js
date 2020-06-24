const password = (password, res) => {
  if (!password) return error(res, 400, 'password attribute is required')
  if (password.length < 8) return error(res, 400, 'password should me more than 8 characters')
  if (password.length > 100) return error(res, 400, 'too long data')
  return null
}

module.exports = {
  password
}