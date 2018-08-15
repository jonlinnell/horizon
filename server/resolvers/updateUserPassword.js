import bcrypt from 'bcryptjs'
import { get } from 'lodash'

import { User } from '../models'

const updateUserPassword = (root, { input: { id, newPassword } }, context) => (
  get(context, 'user.roles', []).indexOf('ADMIN') !== -1
    ? User.findById(id)
      .then(user => user.update({
        password: bcrypt.hashSync(newPassword, 8),
      })
        .catch(updateError => new Error(`Unable to update Password: ${updateError}`)))
      .catch(findError => new Error(`No such userID ${id}: ${findError}`))
    : new Error('Not authenticated or not an administrator')
)

export default updateUserPassword
