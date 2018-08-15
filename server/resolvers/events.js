import { randomBytes } from 'crypto'

import { Event } from '../models'

const events = () => (
  Event.findAll({
    where: {
      deleted: false,
    },
  })
    .then() // return the result
    .catch(error => new Error(`Error retrieving events: ${error}`))
)

export const eventById = (root, { id }) => (
  Event.findById(id, {
    where: {
      delete: false,
    },
  })
    .then() // return the result
    .catch(error => new Error(`Error retrieving event ${id}: ${error}`))
)

export const createNewEvent = (root, { input }, context) => (
  context.user
    ? Event.create(Object.assign({}, input, { id: randomBytes(8).toString('hex') }))
    : new Error('Not authenticated. Entry not created.')
)

export default events

