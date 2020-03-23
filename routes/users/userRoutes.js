const express = require('express')
const router = express.Router()
const passport = require('passport')

const userValidation = require('../users/utils/userValidation')
const userController = require('./controllers/userController')

require('../../lib/passport')

router.get('/', userController.renderIndex)

router.get('/login', userController.renderLogin)
router.post('/login', userController.login)

router.get('/register', userController.renderRegister)
router.post('/register', userValidation, userController.register)

router.get('/homepage', userController.renderHomepage)

router.get('/profile', userController.renderProfile)



module.exports = router
