const Joi = require('joi')

module.exports = Joi.object().keys({
  title: Joi.string(),
  dateStart: Joi.date(),
  dateEnd: Joi.date(),
  summary: Joi.string(),
  location: Joi.string(),
  category: Joi.string(),
  url: Joi.string(),
  public: Joi.boolean(),
  ticketed: Joi.boolean(),
  speakers: Joi.array().items(Joi.object().required().keys({
    name: Joi.string().required(),
    description: Joi.string(),
    headline: Joi.boolean(),
  })),
})
