const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('index');
});

router.get('/register', (req, res) => {
    res.send('Hey This is the REGISTER page');
})

router.get('/login', (req, res) => {
    res.send('Hey This is the LOGIN page');
})

router.get('/about', (req, res) => {
    res.send('Hey This is the ABOUT page')
})
router.get('/services', (req, res) => {
    res.send('Hey This is the SERVICES page')
})
router.get('/contact', (req, res) => {
    res.send('Hey This is the CONTACT page')
})

module.exports = router;
