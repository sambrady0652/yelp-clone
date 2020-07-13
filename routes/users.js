// - External Requirements
const express = require('express');
const csurf = require('csurf');
const { check, validationResults } = require('express-validator');

// - Internal Requirements
const { asyncHandler } = require('../utils');
const db = require('../db/models');

// - Declarations
const { User, Review, Restaurant, userFavoriteRestaurant } = db;
const router = express.Router();
const csrfProtection = csurf({ cookie: true });

//Routes
//Render's Signup Form
router.get('/signup', (req, res) => {
    res.render('user-signup', { title: 'Sign Up - Welp' })
});

//Create New User(submits signup form)
router.post('/', (req, res) => {


});

//Renders User's Profile Page
router.get('/:id(\\d+)', asyncHandler(async (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const user = await User.findByPk(userId)
    const reviews = await Review.findAll({
        include: [User, Restaurant],
        where: {
            userId: userId
        },
        limit: 10
    })
    res.render('user-profile-page', { title: `${user.firstName}'s Profile Page`, user, reviews });
}));

//Renders User's Settings Form 
router.get('/:id(\\d+)/settings', asyncHandler(async (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const user = await User.findByPk(userId)
    //TODO: Add Settings features to database
    res.render('user-settings', { title: `${user.firstName}'s Settings`, user })
}));
//Edit User's Settings (Submits )
router.patch('/:id(\\d+)', (req, res) => {

});
//Remove User
router.delete('/:id(\\d+)', (req, res) => {

});

//View User's Favorite restaurants
router.get('/:id(\\d+)/favorites', asyncHandler(async (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const user = await User.findByPk(userId)
    const favorites = await userFavoriteRestaurant.findAll({
        include: [User, Restaurant],
        where: {
            userId: userId
        }
    });
    res.render('user-favorites', { title: `${user.firstName}'s Favorites`, user, favorites })
}));

//Favorite a Restaurant
router.post('/:id(\\d+)/favorites', (req, res) => {
    res.redirect('/');
});

//Unfavorite a Restaurant 
router.delete('/:id(\\d+)/favorites/:id(\\d+)', (req, res) => {

});


module.exports = router;