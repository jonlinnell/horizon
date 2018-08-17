import { User } from '../models'

const me = (root, args, context) => User.findById(context.user.id, {
  attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
})
  .then() // return the result
  .catch(error => new Error(`A server error occurred. ${error}`))

export default me
