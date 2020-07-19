// - External Requirements
const express = require('express');
const bcrypt = require("bcryptjs");
const csurf = require('csurf');

// - Internal Requirements
const { asyncHandler, handleValidationErrors, includesKeyword } = require('../utils');
const db = require('../db/models');
const validateEmailAndPassword = require('./users');
const { getUserToken } = require('../auth');
const { MapsSecretKey } = require('../config')
const { handleErrors } = require('../utils');

// - Declarations
const { User, Restaurant, RestaurantKeyword } = db;
const router = express.Router();
const csrfProtection = csurf({ cookie: true });

//Routes

//Renders Splash Page
router.get('/', asyncHandler(async (req, res) => {
    const restaurants = await Restaurant.findAll({ limit: 15 });
    res.render('splash-page', { title: "Welcome to Welp", restaurants })
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
        else {
            const token = getUserToken(user);
            const id = user.id;
            res.json({ token, user: { id: id } });
        }
    }));

//Renders Search Results Page 
router.get('/search', asyncHandler(async (req, res) => {
    res.render('search-page', { title: "Search Results" });
}));

router.get('/search/:val', asyncHandler(async (req, res) => {
    const keyword = req.params.val
    const keywordIncluded = await includesKeyword(keyword);
    if (!keywordIncluded) {
        res.render('no-results', { title: "Sorry, No Results" });
    }
    else {
        const searchTerm = await RestaurantKeyword.findOne({ where: { keyword: keyword.toLowerCase() } });
        const restaurants = await Restaurant.findAll({ where: { keywordId: searchTerm.id } });
        res.render('search-page', { title: "Search Results", restaurants })
    }
}));

router.post('/search', asyncHandler(async (req, res) => {
    const { keyword } = req.body;
    const keywordIncluded = await includesKeyword(keyword);

    const key = MapsSecretKey.MAPS_SECRET_KEY;
    const src = `https://maps.googleapis.com/maps/api/js?key=${key}&callback=initMap&libraries=&v=weekly`;

    if (!keywordIncluded) {
        res.render('no-results', { title: "Sorry, No Results" });
    }
    else {
        const searchTerm = await RestaurantKeyword.findOne({ where: { keyword: keyword.toLowerCase() } });
        const restaurants = await Restaurant.findAll({ where: { keywordId: searchTerm.id } });
        res.render('search-page', { title: "Search Results", restaurants, src })
    }
}));

module.exports = router;
