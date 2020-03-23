const { validationResult } = require('express-validator');
const faker = require('faker');
const passport = require('passport');
const bcrypt = require('bcryptjs');

const User = require('../models/User');

require('../../../lib/passport');
require('dotenv').config();

module.exports = {
    renderIndex: (req, res, next) => {
        return res.render('index');
    },

    renderRegister: (req, res) => {
        return res.render('auth/register', { errors: req.flash('errors') });
    },

    register: (req, res, next) => {
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
                                    return res.redirect('/main/homepage');
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
    },

    renderLogin: (req, res) => {
        return res.render('auth/login', { errors: req.flash('errors') });
    },

    login: passport.authenticate('local-login', {
        successRedirect: '/api/users/profile',
        failureRedirect: '/api/users/login',
        failureFlash: true
    }),

    renderHomepage: (req, res) => {
        if (req.isAuthenticated()) {
            return res.render('main/homepage');
        }
        return res.redirect('/users/login');
    },

    renderProfile: (req, res) => {
        if (req.isAuthenticated()) {
            return res.render('auth/profile')
        }
        return res.redirect('/users/login');
    }
};
