//External Modules
const express = require('express');
const sequelize = require('sequelize');
const csurf = require('csurf');
const csrfProtection = csurf({ cookie: true });
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

//Internal Modules
const { asyncHandler } = require('../utils');
const { Restaurant, User, Review } = require('../db/models');
const { awsKeys } = require('../config');

const router = express.Router();

//Photo Uploader Setup
aws.config.update({
    secretAccessKey: awsKeys.AWS_SECRET_KEY,
    accessKeyId: awsKeys.AWS_ACCESS_KEY,
    region: 'us-east-2'
})
const s3 = new aws.S3();
//middleware that sends photo to S3 bucket
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

//Renders Restaurant Profile Page
router.get('/:id(\\d+)', asyncHandler(async (req, res) => {
    const restaurantId = parseInt(req.params.id, 10);
    // Populates Eight Other Restaurants Randomized
    const otherRestaurants = await Restaurant.findAll({
        order: [
            sequelize.fn("RANDOM")
        ],
        limit: 8
    });
    // Populates Ten Restaurant Reviews
    const reviews = await Review.findAll({
        where: {
            restaurantId: restaurantId
        },
        include: [{ model: User },
        { model: Restaurant }],
        limit: 10
    })

    const restaurant = await Restaurant.findOne({
        where: {
            id: restaurantId
        }
    })
    //Calculates Restaurant's Average Rating 
    const reviewAvgFunc = () => {
        let sum = 0;
        const total = reviews.length;
        let i = 0;
        while (i < total) {
            sum += reviews[i].rating;
            i++;
        }
        return Math.floor(sum / total);
    };
    let reviewAvg = reviewAvgFunc();
    if (!reviewAvg) { reviewAvg = 0 };

    res.render('restaurant-profile-page', { reviews, restaurantId, restaurant, otherRestaurants, reviewAvg })
}));

//Render New Review Form
router.get('/:id(\\d+)/reviews/new', csrfProtection, asyncHandler(async (req, res) => {
    let restaurantId = parseInt(req.params.id, 10)
    let restaurant = await Restaurant.findByPk(restaurantId)
    res.render('review-form', { title: "New Review", restaurant, restaurantId, token: req.csrfToken() })
}));

//Submits New Review Form
router.post('/:id(\\d+)/reviews', /*csrfProtection,*/ upload.array('upl', 1), asyncHandler(async (req, res) => {
    let userId = parseInt(req.body.userId, 10)
    let restaurantId = parseInt(req.params.id, 10);
    //gets url for photo being uploaded to S3 bucket

    //Photo Uploader Logic
    if (req.files[0]) {
        let { location } = req.files[0];
        let rating = parseInt(req.body.rating, 10)
        await Review.create({
            userId: userId,
            restaurantId: restaurantId,
            content: req.body.content,
            rating: rating,
            photos: location,
            coolCount: 0,
            funnyCount: 0,
            usefulCount: 0
        })
    } else {
        let location = 'https://welp-app-s3.s3.us-east-2.amazonaws.com/familyEating.jpg';
        let restaurantId = parseInt(req.params.id, 10);
        let rating = parseInt(req.body.rating, 10)
        await Review.create({
            userId: userId,
            restaurantId: restaurantId,
            content: req.body.content,
            rating: rating,
            photos: location,
            coolCount: 0,
            funnyCount: 0,
            usefulCount: 0
        })
    }
    res.redirect(`/restaurants/${restaurantId}`)
}));

//Renders Edit Review Form
router.get('/:id(\\d+)/reviews/:idd(\\d+)/edit', asyncHandler(async (req, res) => {
    const reviewId = parseInt(req.params.idd, 10)
    const review = await Review.findOne({
        where: {
            id: reviewId
        },
        include: [{ model: User },
        { model: Restaurant }]
    })

    let { content, rating } = review;

    res.render('edit-review-form', { title: "Edit Review", review, rating, content })
}));

//Submits Edit Review Form
router.post('/:id(\\d+)/reviews/:idd(\\d+)', csrfProtection, upload.array('upl', 1), asyncHandler(async (req, res) => {
    let { rating, content } = req.body;
    rating = parseInt(rating, 10)
    const reviewId = parseInt(req.params.idd, 10)
    const restaurantId = parseInt(req.params.id, 10)
    const review = await Review.findByPk(reviewId)
    //gets url for photo being uploaded to S3 bucket
    //use photo user attaches or use what they already had/default pic.
    if (req.files[0]) {
        let { location } = req.files[0];
        review.content = content;
        review.rating = rating;
        review.photos = location;
    } else {
        review.content = content;
        review.rating = rating;
    }

    await review.save();

    res.redirect(`/restaurants/${restaurantId}`)
}));

//Deletes a Review
router.delete('/:id(\\d+)/reviews/:idd(\\d+)', asyncHandler(async (req, res) => {
    const restaurantId = parseInt(req.params.id, 10)
    const review = await Review.findByPk(req.params.idd)

    await review.destroy()

    res.redirect(`/restaurants/${restaurantId}`)
}));

module.exports = router;
