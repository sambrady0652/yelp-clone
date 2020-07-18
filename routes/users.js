// - External Requirements
const express = require('express');
const bcrypt = require('bcryptjs');
const csurf = require('csurf');
const cookieParser = require('cookie-parser');
const { check } = require('express-validator');
const aws = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')

// - Internal Requirements
const { asyncHandler, handleValidationErrors } = require('../utils');
const db = require('../db/models');
const { getUserToken, requireAuth } = require('../auth');
const { sequelize } = require('../db/models');
const { awsKeys } = require('../config')
aws.config.update({
    secretAccessKey: awsKeys.AWS_SECRET_KEY,
    accessKeyId: awsKeys.AWS_ACCESS_KEY,
    region: 'us-east-2'
})
const s3 = new aws.S3();

var upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'welp-app-s3',
        acl: 'public-read',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: function (req, file, cb) {
            cb(null, file.originalname);
        }
    })
})

// - Declarations
const { User, Review, Restaurant, userFavoriteRestaurant, RestaurantKeywords } = db;
const router = express.Router();
const csrfProtection = csurf({ cookie: true });

// - Users-wide Middleware
router.use(requireAuth);
router.use(cookieParser());

// - Validations
const validateEmailAndPassword = [
    check("email")
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage("Please provide a valid email."),
    check("password")
        .exists({ checkFalsy: true })
        .withMessage("Please provide a password."),
];

//This does not appear to be being used; can we delete?
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
// ----
//Render's Signup Form
// --- working
router.get('/signup', (req, res) => {
    res.render('user-signup', { title: 'Sign Up - Welp' });
});

//Create New User(submits signup form)
// --- working
router.post(
    '/',
    validateEmailAndPassword,
    handleValidationErrors,
    asyncHandler(async (req, res) => {
        const { firstName, lastName, email, password, city, state, profilePicture } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ firstName, lastName, email, hashedPassword, city, state, profilePicture });

        /* TODO: Insert Unique Constraint on email error handling
        if(there is a unique constraint error on the email) {
            const err = new Error("Signup Failed");
            err.status = 401;
            err.title = "Signup Failed;
            err.errors = ["Please provide a unique email address."];

            res.status(400).json({ err });
        }
        */

        const token = getUserToken(user);
        const id = user.id;
        res.json({ token, user: { id: id } });
    }));

//Renders User's Profile Page
// --- working
router.get('/:id(\\d+)',
    csrfProtection,
    asyncHandler(async (req, res) => {
        const userId = parseInt(req.params.id, 10);
        const user = await User.findByPk(userId)
        const reviews = await Review.findAll({
            include: [User, Restaurant],
            where: {
                userId: userId
            },
            limit: 10
        })

        //res.send({reviews})
        res.render('user-profile-page', { title: `${user.firstName}'s Profile Page`, user, reviews, token: req.csrfToken() });
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
            token: req.csrfToken()
        });
    })
);

//Edit User's Settings
router.post(
    '/:id(\\d+)/edit', upload.array('upl', 1),
    //csrfProtection,
    asyncHandler(async (req, res) => {
        const userId = parseInt(req.params.id, 10);
        let { location } = req.files[0];
        console.log(location)
        const userToUpdate = await User.findByPk(userId);
        const { firstName, lastName, City, State } = req.body;

        userToUpdate.firstName = firstName;
        userToUpdate.lastName = lastName;
        userToUpdate.city = City;
        userToUpdate.state = State;
        userToUpdate.profilePicture = location;

        await userToUpdate.save();

        res.redirect(`/users/${parseInt(userToUpdate.id, 10)}`);
    })
);

//Remove User
router.post(
    '/:id(\\d+)/',
    csrfProtection,
    asyncHandler(async (req, res) => {
        const userId = parseInt(req.params.id, 10);
        const user = await User.findByPk(userId);
        await user.destroy();
        res.redirect('/');
    }));









//View User's Favorite restaurants
// --- working
router.get('/:id(\\d+)/favorites', asyncHandler(async (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const user = await User.findByPk(userId);
    const favorites = await userFavoriteRestaurant.findAll({
        include: [User, Restaurant],
        where: {
            userId: userId
        }
    });

    /*
    THIS PORTION OF THE CODE IS NOT FUNCTIONING
    UNKNOWN WHAT IS BEING PASSED IN FETCH REQUEST
    SEE FILE /PUBLIC/JS/FAVORITE.JS
    */
    // res.json({
    //     restaurant: favorites.restaurantId,
    //     user: favorites.userId,
    // });

    //THIS WORKS
    res.render('user-favorites', { title: `${user.firstName}'s Favorites`, user, favorites })
}));

//Favorite a Restaurant
// --- NOT WORKING
router.post(
    '/:id(\\d+)/favorites',
    csrfProtection,
    asyncHandler(async (req, res) => {
        const { restaurantId } = req.body;
        const userId = parseInt(req.params.id, 10);
        const checkFavorite = await userFavoriteRestaurant.findAll({
            where: {
                userId: userId,
                restaurantId: restaurantId,
            }
        })

        if (!checkFavorite) {
            const newFavorite = await userFavoriteRestaurant.create({
                restaurantId: restaurantId,
                userId: userId,
            })
        } else {
            const favorite = await userFavoriteRestaurant.findByPk({
                include: [User, Restaurant],
                where: {
                    userId: userId
                }
            });
            await favorite.destroy();
        }
    })
);

//Unfavorite a Restaurant
// --- NOT WORKING
router.post(
    '/:id(\\d+)/favorites/:id(\\d+)',
    csrfProtection,
    asyncHandler(async (req, res) => {
        const { restaurantId } = req.body;
        const userId = parseInt(req.params.id, 10);
        const favoriteToDestroy = userFavoriteRestaurant.findOne({
            where: {
                userId: userId,
                restaurantId: restaurantId
            }
        });
        await favoriteToDestroy.destroy();
        res.redirect('')

    }));


module.exports = router;
