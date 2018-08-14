import jwt from 'jsonwebtoken'

import resolveSecret from './resolveSecret'

const verifyToken = (token) => {
  if (!token) return null

  return jwt.verify(token, resolveSecret(), (error, decoded) => {
    if (error) {
      return new Error(`Token verification error: ${error}`)
    }

    return decoded.id
  })
}

export default verifyToken
