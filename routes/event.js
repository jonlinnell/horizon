const Joi = require('joi')

const verifyToken = require('../lib/verifyToken')

const { Event } = require('../models')

const eventCreateSchema = require('../schemas/eventCreate')

const endpoint = '/event'

module.exports = (app) => {
  app.get(endpoint, verifyToken, (req, res) => {
    Event.findAll({
      where: {
        deleted: false
      }
    })
      .then((events) => {
        res.json(events)
      })
  })

  app.post(endpoint, verifyToken, (req, res) => {
    Joi.validate(req.body, eventCreateSchema, (error) => {
      if (error) {
        res
          .status(400)
          .send(error)
      } else {
        Event.create(req.body)
          .then(event => res.json(event))
          .catch(dbError =>
            res
              .status(500)
              .send(dbError))
      }
    })
  })

  app.get(`${endpoint}/:from/:to`, verifyToken, (req, res) => {})
  app.get(`${endpoint}/deleted`, verifyToken, (req, res) => {})
  app.get(`${endpoint}/:id`, verifyToken, (req, res) => {})
  app.put(`${endpoint}/:id`, verifyToken, (req, res) => {})
  app.delete(`${endpoint}/:id`, verifyToken, (req, res) => {})
}
