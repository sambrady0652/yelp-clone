// - External Requirements
const express = require('express');
const csurf = require('csurf');
const { check } = require('express-validator');
const aws = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')

// - Internal Requirements
const { asyncHandler } = require('../utils');
const db = require('../db/models');
const { sequelize } = require('../db/models');
const  { awsKeys } = require('../config')
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

// - Declarations
const router = express.Router();
const csrfProtection = csurf({ cookie: true });
const { Restaurant, User, Review } = db;

// - Routes

//Renders Restaurant Profile Page
router.get('/:id(\\d+)', asyncHandler(async (req, res) => {
    const restaurantId = parseInt(req.params.id, 10);

        const reviews = await Review.findAll({
            where: {
                restaurantId: restaurantId
            },
            include: [{model: User },
            {model: Restaurant}],
            limit: 10
        })

        const restaurant = await Restaurant.findOne({
            where: {
                id: restaurantId
            }
        })

    res.render('restaurant-profile-page', { reviews, restaurantId, restaurant })
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
    if(req.files[0]){
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
    }else{
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
router.get('/:id(\\d+)/reviews/:idd(\\d+)/edit', csrfProtection, asyncHandler(async (req, res) => {
    const reviewId = parseInt(req.params.idd, 10)
    const review = await Review.findByPk(reviewId)
    console.log(review)
    let { content, rating } = review


    res.render('review-form', { title: "Edit Review", rating, content, token: req.csrfToken() })
}));

//Submits Edit Review Form
router.patch('/:id(\\d+)/reviews/:idd(\\d+)', csrfProtection, upload.array('upl', 1), asyncHandler(async (req, res) => {
    let { rating, content } = req.body;
    rating = parseInt(rating, 10)
    const reviewId = parseInt(req.params.idd, 10)
    const restaurantId = parseInt(req.params.id, 10)
    const review = await Review.findByPk(reviewId)
    //gets url for photo being uploaded to S3 bucket
    let { location } = req.files[0];

    review.content = content;
    review.rating = rating;
    review.photos = location;

    await review.save();



    res.redirect(`/restaurants/${restaurantId}`)
}));

//deletes a review
router.delete('/:id(\\d+)/reviews/:idd(\\d+)', asyncHandler(async (req, res) => {
    const restaurantId = parseInt(req.params.id, 10)
    const review = await Review.findByPk(req.params.idd)

    await review.destroy()


    res.redirect(`/restaurants/${restaurantId}`)
}));



module.exports = router;
