import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { readFileSync } from 'fs'

import { User } from '../models'

const secret = readFileSync(`${__dirname}/../config/secret`)

const authenticate = (root, { username, password }) =>
  new Promise((resolve, reject) => {
    User.findOne({
      where: { username },
    })
      .then((user) => {
        if (!user) {
          reject(new Error('User not found'))
        }

        if (bcrypt.compareSync(password, user.password)) {
          jwt.sign({ id: user.id }, secret, { expiresIn: 86400 }, (error, token) => {
            resolve(token)
          })
        } else {
          reject(new Error('Password incorrect'))
        }
      })
      .catch(error => reject(new Error(`A server error occurred. ${error}`)))
  })

export default authenticate
