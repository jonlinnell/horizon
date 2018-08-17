import bcrypt from 'bcryptjs'

import { User } from '../models'

const register = (roots, { input: { username, password } }, context) =>
  new Promise((resolve, reject) => {
    if (!context.user) reject(new Error('Not authenticated.'))

    User.create({
      username,
      password: bcrypt.hashSync(password, 8),
    })
      .then(newUser =>
        resolve({
          id: newUser.id,
          username: newUser.username,
          createdAt: newUser.createdAt,
        }))
      .catch(error => reject(error))
  })

export default register
