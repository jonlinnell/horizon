const fs = require('fs')
const jwt = require('jsonwebtoken')

const secret = fs.readFileSync('./config/secret', 'utf8').trim()

function verifyToken(req, res, next) {
  const token = req.headers['x-access-token']

  if (!token) {
    return res.status(403).send({ auth: false, message: 'No access token provided.' })
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(403).send({ auth: false, message: 'Failed to authenticate token' })
    }

    req.userId = decoded.id

    next()
  })
}

module.exports = verifyToken
