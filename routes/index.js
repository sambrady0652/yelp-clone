// - External Requirements
const express = require('express');
const csurf = require('csurf');
const { check, validationResults } = require('express-validator');

// - Internal Requirements
const { asyncHandler } = require('../utils');
const db = require('../db/models');

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
    res.redirect('/')
}));

//Renders Search Results Page 
router.get('/search', asyncHandler(async (req, res) => {
    res.render('search-page', { title: "Search Results" });
}));



module.exports = router;