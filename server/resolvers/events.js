import { randomBytes } from 'crypto'

import { Event } from '../models'

const events = (root, args, context) => (
  context.user
    ? Event.findAll({
      where: {
        deleted: false,
      },
    })
      .then() // return the result
      .catch(error => new Error(`Error retrieving events: ${error}`))
    : new Error('Not authenticated.')
)

export const eventById = (root, { id }, context) => (
  context.user
    ? Event.findById(id, {
      where: {
        delete: false,
      },
    })
      .then() // return the result
      .catch(error => new Error(`Error retrieving event ${id}: ${error}`))
    : new Error('Not authenticated.')
)

export const createNewEvent = (root, { input }, context) => (
  context.user
    ? Event.create(Object.assign({}, input, { id: randomBytes(8).toString('hex') }))
    : new Error('Not authenticated. Entry not created.')
)

export default events

