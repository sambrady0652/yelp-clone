// - External Requirements
const express = require('express');
const bcrypt = require('bcryptjs');
const csurf = require('csurf');
const { check } = require('express-validator');

// - Internal Requirements
const { asyncHandler, handleValidationErrors } = require('../utils');
const db = require('../db/models');
const { getUserToken, requireAuth } = require('../auth');

// - Declarations
const { User, Review, Restaurant, userFavoriteRestaurant } = db;
const router = express.Router();
const csrfProtection = csurf({ cookie: true });

// - Validations
const validateEmailAndPassword = [
    check("email")
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage("Please provide a valid email."),
    check("password")
        .exists({ checkFalsy: true })
        .withMessage("Please provide a password."),
    handleValidationErrors,
];

router.use(requireAuth);
//Routes
//Render's Signup Form
router.get('/signup', (req, res) => {
    res.render('user-signup', { title: 'Sign Up - Welp' })
});

//Create New User(submits signup form)
router.post('/', validateEmailAndPassword, asyncHandler(async (req, res) => {
    const { firstName, lastName, email, password, city, state } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ firstName, lastName, email, hashedPassword, city, state });

    res.redirect(`/users/${parseInt(user.id, 10)}`);
}));

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