import { get } from 'lodash'

import { Event } from '../models'

const updateEvent = (root, { input }, context) => (
  get(context, 'user.roles', []).indexOf('ADMIN') !== -1
    ? Event.findById(input.id)
      .then(user => user.update(input)
        .catch(updateError => new Error(`Unable to update event: ${updateError}`)))
      .catch(findError => new Error(`No such event with ID ${input.id}: ${findError}`))
    : new Error('Not authenticated or not an administrator')
)

export default updateEvent
