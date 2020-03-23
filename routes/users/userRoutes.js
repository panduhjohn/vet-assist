const express = require('express')
const router = express.Router()

const userValidation = require('../users/utils/userValidation')
const userController = require('./controllers/userController')

require('../../lib/passport')

// router.get('/', userController.renderIndex)


router.get('/register', userController.renderRegister)
router.post('/register', userValidation, userController.register)

router.get('/homepage', (req, res) => {
    if (req.isAuthenticated()) {
        return res.render('main/homepage')
    }
    return res.redirect('/users/login')
})

router.get('/', (req, res, next) => {
    return res.render('index');
});



module.exports = router
