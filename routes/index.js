//External Modules
const express = require('express');

//Internal Modules
const { asyncHandler, handleValidationErrors, includesKeyword, validateEmailAndPassword, getFavs } = require('../utils');
const { User, Restaurant, RestaurantKeyword } = require('../db/models');
const { getUserToken } = require('../auth');

const router = express.Router();


//Renders Splash Page
router.get('/', asyncHandler(async (req, res) => {
    const restaurants = await Restaurant.findAll({ limit: 15 });
    res.render('splash-page', { title: "Welcome to Welp", restaurants })
}));

//Renders Login Form
router.get('/login', asyncHandler(async (req, res) => {
    res.render('login', { title: "Log In - Welp" })
}));

//Submits Login Form, Starts User Session
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

//Renders Empty Search Results Page 
router.get('/search', asyncHandler(async (req, res) => {
    res.render('search-page', { title: "Search Results" });
}));

//Renders Search Result Page with keyword provided via Req.params
router.get('/search/:val', asyncHandler(async (req, res) => {
    const keyword = req.params.val
    //Checks to see if the word put into the search form is cintained within the database 
    const keywordIncluded = await includesKeyword(keyword);
    if (!keywordIncluded) {
        res.render('no-results', { title: "Sorry, No Results" });
    }
    else {
        const searchTerm = await RestaurantKeyword.findOne({ where: { keyword: keyword.toLowerCase() } });
        //Checks to see if there are any restaurants associated with that keyword
        if (!searchTerm) {
            res.render('no-results', { title: "Sorry, No Results" });
        }
        else {
            const restaurants = await Restaurant.findAll({ where: { keywordId: searchTerm.id } });
            res.render('search-page', { title: "Search Results", restaurants })
        }
    }
}));

//Renders Search Results Page with keyword provided via Req.body
router.post('/search', asyncHandler(async (req, res) => {
    const { keyword } = req.body;
    //Checks to see if the word put into the search form is cintained within the database 
    const keywordIncluded = await includesKeyword(keyword);
    if (!keywordIncluded) {
        res.render('no-results', { title: "Sorry, No Results" });
    }
    else {
        const searchTerm = await RestaurantKeyword.findOne({ where: { keyword: keyword.toLowerCase() } });
        //Checks to see if there are any restaurants associated with that keyword
        if (!searchTerm) {
            res.render('no-results', { title: "Sorry, No Results" });
        }
        else {
            const restaurants = await Restaurant.findAll({ where: { keywordId: searchTerm.id } });
            res.render('search-page', { title: "Search Results", restaurants })
        }
    }
}));

module.exports = router;
