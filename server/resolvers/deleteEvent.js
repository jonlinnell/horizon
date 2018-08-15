import { get } from 'lodash'

import { Event } from '../models'

const deleteEvent = (root, { input: { id } }, context) => (
  get(context, 'user.roles', []).indexOf('ADMIN') !== -1
    ? Event.findById(id)
      .then(event => event.destroy()
        .catch(deleteError => new Error(`Unable to delete event: ${deleteError}`)))
      .catch(findError => new Error(`No event with ID ${id}: ${findError}`))
    : new Error('Not authenticated or not an administrator')
)

export default deleteEvent
