const { Schema, model } = require('mongoose')
const Joi = require('joi')

const contactSchema = Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact'],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
}, { versionKey: false, timestamps: true })

const validationMiddleware = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(25).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    favorite: Joi.boolean(),
  })

  const { error } = schema.validate(req.body)
  if (error) {
    const postError = new Error(error.message)
    postError.status = 400
    return next(postError)
  }
  next()
}

const Contact = model('contact', contactSchema)

module.exports = { Contact, validationMiddleware }
