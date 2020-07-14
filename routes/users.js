// - External Requirements
const express = require('express');
const bcrypt = require('bcryptjs');
const csurf = require('csurf');
const { check } = require('express-validator');

// - Internal Requirements
const { asyncHandler, handleValidationErrors } = require('../utils');
const db = require('../db/models');
const { getUserToken, requireAuth } = require('../auth');
const { sequelize } = require('../db/models');

// - Declarations
const { User, Review, Restaurant, userFavoriteRestaurant } = db;
const router = express.Router();
const csrfProtection = csurf({ cookie: true });

// - Users-wide Middleware
router.use(requireAuth);

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
const validateUserSettings = [
    check("firstName")
        .exists({ checkFalsy: true })
        .withMessage("Please provide a First Name."),
    check("lastName")
        .exists({ checkFalsy: true })
        .withMessage("Please provide a Second Name."),
    check("city")
        .exists({ checkFalsy: true })
        .withMessage("Please provide a City."),
    check("state")
        .exists({ checkFalsy: true })
        .withMessage("Please provide a State."),
];

//Routes
//Render's Signup Form
router.get('/signup', csrfProtection, (req, res) => {
    res.render('user-signup', { title: 'Sign Up - Welp', crsfToken: req.crsfToken() });
});

//Create New User(submits signup form)
router.post(
    '/', 
    validateEmailAndPassword,
    csrfProtection, 
    asyncHandler(async (req, res) => {
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
router.get(
    '/:id(\\d+)/settings', 
    csrfProtection, 
    asyncHandler(async (req, res) => {
        const userId = parseInt(req.params.id, 10);
        const user = await User.findByPk(userId);
        
        //TODO: Add Settings features to database

        res.render('user-settings', { 
            title: `${user.firstName}'s Settings`, 
            user, 
            csrfToken: req.csrfToken() 
        });
    })
);
//Edit User's Settings (Submits )
router.patch(
    '/:id(\\d+)', 
    csrfProtection, 
    validateUserSettings,
    asynchHandler(async (req, res) => {
        const { firstName, lastName, city, state } = req.body;
        const userId = parseInt(req.params.id, 10);
        const userToUpdate = await User.findByPk(userId);
        const user = { firstName, lastName, city, state };
        await userToUpdate.update(user);
        res.redirect(`/users/${parseInt(user.id, 10)}`);
    })
);
//Remove User
// --- Changed VERB to "POST"
// --- no validate called
router.post(
    '/:id(\\d+)', 
    csrfProtection,
    asyncHandler(async (req, res) => {
        const userId = parseInt(req.params.id, 10);
        const user = await User.findByPk(userId);
        await user.destroy();
        res.redirect('/');
    }));

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