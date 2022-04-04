const { Contact } = require('../models')

const contactUpdate = async (req, res, next) => {
  try {
    const { contactId } = req.params
    const result = await Contact.findByIdAndUpdate(contactId, req.body, { new: true })
    if (!result) {
      res.status(400).json({
        status: 'error',
        code: 400,
        message: 'Missing field',
      })
      return
    }
    res.json({
      status: 'success',
      code: 200,
      data: {
        result,
      },
    })
  } catch (error) {
    next(error)
  }
}

module.exports = contactUpdate
