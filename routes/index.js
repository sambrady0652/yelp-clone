// - External Requirements
const express = require('express');
const bcrypt = require("bcryptjs");
const csurf = require('csurf');
const { check, validationResult } = require('express-validator');

// - Internal Requirements
const { asyncHandler, handleValidationErrors } = require('../utils');
const db = require('../db/models');
const validateEmailAndPassword = require('./users');
const { getUserToken } = require('../auth');

const { handleErrors } = require('../utils');

// - Declarations
const { User, Restaurant, RestaurantKeyword } = db;
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
router.post(
    "/login",
    validateEmailAndPassword,
    handleValidationErrors,
    asyncHandler(async (req, res, next) => {
        const { email, password } = req.body;

        const user = await User.findOne({
            where: {
                email,
            },
        });

        if (!user || !user.validatePassword(password)) {
            const err = new Error("Login failed");
            err.status = 401;
            err.title = "Login failed";
            err.errors = ["The provided credentials were invalid."];

            res.status(400).json({ err });
        }

        const token = getUserToken(user);
        const id = user.id;
        res.json({ token, user: { id: id } });
    }));


//Renders Search Results Page 
router.get('/search', asyncHandler(async (req, res) => {
    res.render('search-page', { title: "Search Results" });
}));
router.post('/search', asyncHandler(async (req, res) => {
    console.log("INSIDE THE ROUTE-------------")
    const { keyword } = req.body;
    if (keyword === "") {
        const popularRestaurant = await Restaurant.findOne();
        res.render('search-page', { title: "Search Results", popularRestaurant })
    }
    else {
        const searchTerm = await RestaurantKeyword.findOne({ where: { keyword: keyword.toLowerCase() } });
        const restaurants = await Restaurant.findAll({ where: { keywordId: searchTerm.id } });
        res.render('search-page', { title: "Search Results", restaurants })
    }
}));

//NOTE: search results handled via routes/api and ajax in public/js/map-search.js


module.exports = router;
