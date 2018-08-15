import { get } from 'lodash'

import { User } from '../models'

const deleteUser = (root, { input: { id } }, context) => (
  get(context, 'user.roles', []).indexOf('ADMIN') !== -1
    ? User.findById(id)
      .then(user => user.destroy()
        .catch(deleteError => new Error(`Unable to delete user: ${deleteError}`)))
      .catch(findError => new Error(`No such userID ${id}: ${findError}`))
    : new Error('Not authenticated or not an administrator')
)

export default deleteUser
