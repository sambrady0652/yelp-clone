// - External Requirements
const express = require('express');
const csurf = require('csurf');
const { check } = require('express-validator');

// - Internal Requirements
const { asyncHandler } = require('../utils');
const db = require('../db/models');
const { sequelize } = require('../db/models');

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


    res.render('restaurant-profile-page', { reviews })
}));

//Render New Review Form
router.get('/:id(\\d+)/reviews/new', csrfProtection, asyncHandler(async (req, res) => {
    let restaurantId = parseInt(req.params.id, 10)
    //review form does not exist yet. Placeholder for now.
    res.render('review-form', { title: "New Review", restaurantId, token: req.csrfToken() })
}));

//Submits New Review Form
router.post('/:id(\\d+)/reviews', csrfProtection, asyncHandler(async (req, res) => {
    let userId = parseInt(req.body.userId, 10)
    console.log("userID:   " + userId)
    let restaurantId = parseInt(req.params.id, 10);
    let rating = parseInt(req.body.rating, 10)
    await Review.create({
        userId: userId,
        restaurantId: restaurantId,
        content: req.body.content,
        rating: rating,
        photos: req.body.photo,
        coolCount: 0,
        funnyCount: 0,
        usefulCount: 0
    })


    res.redirect(`/${restaurantId}`)

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
router.patch('/:id(\\d+)/reviews/:idd(\\d+)', csrfProtection, asyncHandler(async (req, res) => {
    let { rating, content } = req.body;
    rating = parseInt(rating, 10)
    const reviewId = parseInt(req.params.idd, 10)
    const restaurantId = parseInt(req.params.id, 10)
    const review = await Review.findByPk(reviewId)

    review.content = content;
    review.rating = rating;

    await review.save();

    await sequelize.close();



    res.redirect(`/${restaurantId}`)
}));

//deletes a review
router.delete('/:id(\\d+)/reviews/:idd(\\d+)', asyncHandler(async (req, res) => {
    const restaurantId = parseInt(req.params.id, 10)
    const review = await Review.findByPk(req.params.idd)

    await review.destroy()

    await sequelize.close()


    res.redirect(`/${restaurantId}`)
}));



module.exports = router;
