// - External Requirements
const express = require('express');
const bcrypt = require('bcryptjs');
const csurf = require('csurf');
const { check } = require('express-validator');

// - Internal Requirements
const { asyncHandler, handleValidationErrors } = require('../utils');
const db = require('../db/models');
const { requreAuth } = require('../auth');

// - Declarations
const { User } = db;
const router = express.Router();
const csrfProtection = csurf({ cookie: true });

//Routes

//Renders Splash Page
router.get('/', asyncHandler(async (req, res) => {
    res.render('splash-page', { title: "Welcome to Welp" })
}));

//Renders Login Form
router.get('/login', asyncHandler(async (req, res) => {
    res.render('login', { title: "Log In - Welp" })
}));

//Submits Login Form, Starts Session
router.post('/login', asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({
        where: {
            email
        }
    });

    res.redirect('/')
}));

//Renders Search Results Page 
router.get('/search', asyncHandler(async (req, res) => {
    res.render('search-page', { title: "Search Results" });
}));



module.exports = router;

