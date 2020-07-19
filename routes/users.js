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
const { asyncHandler, handleValidationErrors, emailNotUnique, isFavorited } = require('../utils');
const db = require('../db/models');
const { getUserToken, requireAuth } = require('../auth');
const { sequelize } = require('../db/models');
const { awsKeys } = require('../config');

//Photo Upload
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
        .withMessage("Please provide a password.")
];

//Routes

//Render's Signup Form
router.get('/signup', (req, res) => {
    res.render('user-signup', { title: 'Sign Up - Welp' });
});

//Create New User(submits signup form)
router.post(
    '/',
    validateEmailAndPassword,
    handleValidationErrors,
    asyncHandler(async (req, res) => {
        const { firstName, lastName, email, password, city, state, profilePicture } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const emailInUse = await emailNotUnique(email);
        if (emailInUse) {
            const err = new Error("Signup failed");
            err.status = 401;
            err.title = "Signup failed";
            err.errors = ["That email is already in use."];
            res.status(400).json({ err });
        }
        else {
            const user = await User.create({ firstName, lastName, email, hashedPassword, city, state, profilePicture });
            const token = getUserToken(user);
            const id = user.id;
            res.json({ token, user: { id: id } });
        }
    }));

//Renders User's Profile Page
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
        var userToUpdate;
        if (req.files[0]) {
            let { location } = req.files[0];
            userToUpdate = await User.findByPk(userId);
            const { firstName, lastName, City, State } = req.body;

            userToUpdate.firstName = firstName;
            userToUpdate.lastName = lastName;
            userToUpdate.city = City;
            userToUpdate.state = State;
            userToUpdate.profilePicture = location;
        } else {
            tempUser = await User.findByPk(userId);
            let { profilePicture } = tempUser;
            var location = profilePicture;
            userToUpdate = await User.findByPk(userId);
            const { firstName, lastName, City, State } = req.body;

            userToUpdate.firstName = firstName;
            userToUpdate.lastName = lastName;
            userToUpdate.city = City;
            userToUpdate.state = State;
            userToUpdate.profilePicture = location;
        }




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
        const reviews = await Review.findAll({
            where: { userId: userId }
        })
        //Before we can delete user, we must delete their reviews.
        if (reviews.length > 0) {
            for (let i = 0; i < reviews.length; i++) {
                await reviews[i].destroy()
            }
        }
        const user = await User.findByPk(userId);
        await user.destroy();
        res.redirect('/');
    }));

//View User's Favorite restaurants
router.get('/:id(\\d+)/favorites', asyncHandler(async (req, res) => {
    const userId = Number(req.params.id);
    const user = await User.findByPk(userId);
    const favorites = await userFavoriteRestaurant.findAll({
        include: [User, Restaurant],
        where: {
            userId: userId
        }
    });
    const restaurants = favorites.map((fav) => fav = fav.Restaurant);

    res.render('user-favorites', { title: `${user.firstName}'s Favorites`, user, restaurants })
}));

//Favorite/Unfavorite a Restaurant
router.post('/:id(\\d+)/favorites', asyncHandler(async (req, res) => {
    const userId = Number(req.body.userId);
    const restaurantId = Number(req.body.restaurantId);
    const restaurant = await Restaurant.findByPk(restaurantId);
    const keywordId = restaurant.keywordId;
    const restaurantIsFavorited = await isFavorited(userId, restaurantId)
    if (restaurantIsFavorited) {
        const favoriteToDestroy = await userFavoriteRestaurant.findOne({
            where: {
                userId: userId,
                restaurantId: restaurantId
            }
        });
        await favoriteToDestroy.destroy();
        res.json(null)
    }
    else {
        const newFav = await userFavoriteRestaurant.create({ userId, restaurantId, keywordId })
        res.json({ newFav })
    }
}));


module.exports = router;
