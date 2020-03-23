const { validationResult } = require('express-validator')
const faker = require('faker')
const passport = require('passport')

const User = require('../models/User')

require('../../../lib/passport')
require('dotenv').config()

module.exports = {
    

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
                                    return res.redirect('/users/homepage');
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


};