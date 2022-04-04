const express = require('express')
const router = express.Router()
const {
  getAllContacts,
  getContactById,
  deleteContactById,
  addNewContact,
  contactUpdate,
  changeStatus
} = require('../../controllers')
const { validationMiddleware } = require('../../models/contact')

router.get('/', getAllContacts)

router.get('/:contactId', getContactById)

router.post('/', validationMiddleware, addNewContact)

router.delete('/:contactId', deleteContactById)

router.put('/:contactId', validationMiddleware, contactUpdate)

router.patch('/:contactId/favorite', changeStatus)

module.exports = router
