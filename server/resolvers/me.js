import { get } from 'lodash'

import { User } from '../models'

const me = (root, args, context) => User.findById(get(context, 'user.id', null), {
  attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
})
  .then() // return the result
  .catch(error => new Error(`A server error occurred. ${error}`))

export default me
