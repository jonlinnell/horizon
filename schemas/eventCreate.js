const Joi = require('joi')

module.exports = Joi.object().keys({
  title: Joi.string().required(),
  dateStart: Joi.date().required(),
  dateEnd: Joi.date().required(),
  summary: Joi.string(),
  location: Joi.string().required(),
  category: Joi.string().required(),
  url: Joi.string(),
  public: Joi.boolean().required(),
  ticketed: Joi.boolean().required(),
  speakers: Joi.array().items(Joi.object().required().keys({
    name: Joi.string().required(),
    description: Joi.string(),
    headline: Joi.boolean(),
  })),
})
