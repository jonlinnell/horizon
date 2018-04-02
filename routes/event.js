const Joi = require('joi')
const sha256 = require('sha256')

const verifyToken = require('../lib/verifyToken')

const { Event } = require('../models')

const eventCreateSchema = require('../schemas/eventCreate')
const eventUpdateSchema = require('../schemas/eventUpdate')

const endpoint = '/event'

module.exports = (app) => {
  app.get(endpoint, (req, res) => {
    Event.findAll({
      where: {
        deleted: false
      }
    })
      .then(events => res.json(events))
  })

  app.post(endpoint, verifyToken, (req, res) => {
    Joi.validate(req.body, eventCreateSchema, (error) => {
      if (error) {
        res
          .status(400)
          .send(error)
      } else {
        Event.create(Object.assign(req.body, {
          dateStart: new Date(req.body.dateStart),
          dateEnd: new Date(req.body.dateEnd)
        }))
          .then(event => res.json(event))
          .catch(dbError =>
            res
              .status(500)
              .send(dbError))
      }
    })
  })

  app.get(`${endpoint}/deleted`, verifyToken, (req, res) => {
    Event.findAll({
      where: {
        deleted: true
      }
    })
      .then(events => res.json(events))
  })

  app.get(`${endpoint}/:id`, (req, res) => {
    Event.findById(req.params.id)
      .then(event => (
        event
          ? res.json(event)
          : res.status(404).send('Event not found')))
  })

  app.put(`${endpoint}/:id`, verifyToken, (req, res) => {
    Event.findById(req.params.id)
      .then((event) => {
        Joi.validate(req.body, eventUpdateSchema, (error) => {
          if (error) {
            res
              .status(400)
              .send(error)
          } else {
            event.update(req.body, {
              where: {
                id: req.params.id
              }
            })
              .then(updatedEvent => res.json(updatedEvent))
              .catch(updateError => res.status(500).send(updateError))
          }
        })
      })
      .catch(error => res.status(404).send(error))
  })

  app.delete(`${endpoint}/:id`, verifyToken, (req, res) => {
    Event.findById(req.params.id)
      .then(event =>
        Event.update({
          title: `__${event.title}_${sha256(`${event.title}${event.createdAt}`).substr(51, 6)}`,
          deleted: true
        }, {
          where: {
            id: req.params.id
          }
        })
          .then(() => res.sendStatus(200))
          .catch(error => res.status(500).send(error)))
      .catch(error => res.status(500).send(error))
  })
}
