const express = require('express');
const router = express.Router();
const passport = require('passport')
const faker = require('faker')
const { validationResult } = require('express-validator');

const User = require('./users/models/User')

/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('index');
});

//! Register Routes
router.get('/register', (req, res) => {
    res.render('auth/register', { errors: req.flash('errors') });
})

router.post('/register', (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    User.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                // return req.flash('errors', 'User already exists');
                return res.send('User Exists');
            } else {
                const newUser = new User();

                newUser.name = req.body.name;
                newUser.picture = faker.image.avatar();
                newUser.email = req.body.email;
                newUser.password = req.body.password;

                newUser
                    .save()
                    .then(user => {
                        req.login(user, err => {
                            if (err) {
                                return res.status(400).json({
                                    confirmation: false,
                                    message: err
                                });
                            } else {
                                return res.redirect('/');
                                // next();
                            }
                        });
                    })
                    .catch(err => {
                        return next(err);
                    });
            }
        })
        .catch(err => console.log(err));
});


//! Login Routes
router.get('/login', (req, res) => {
    res.render('auth/login', { errors: req.flash('errors') });
})

router.post('/login', passport.authenticate('local-login', {
        successRedirect: '/',
        failureRedirect: '/api/users/login',
        failureFlash: true
    })
);

router.get('/about', (req, res) => {
    res.render('main/about')
})
router.get('/services', (req, res) => {
    res.render('main/services')
})
router.get('/contact', (req, res) => {
    res.render('main/contact')
})

module.exports = router;
