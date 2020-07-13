// - External Requirements
const express = require('express');
const csurf = require('csurf');
const { check, validationResults } = require('express-validator');

// - Internal Requirements
const { asyncHandler } = require('../utils');
const db = require('../db/models');

// - Declarations
const router = express.Router();
const csrfProtection = csurf({ cookie: true });
const { Restaurant, User, Review } = db;

// - Routes

//Renders Restaurant Profile Page 
router.get('/:id(\\d+)', asyncHandler(async (req, res) => {
    const restaurantId = parseInt(req.params.id, 10);
    const reviews = await Review.findAll({
        include: [User, Restaurant],
        where: {
            restaurantId: restaurantId
        },
        limit: 10
    });
    res.render('restaurant-profile-page', { reviews })
}));

//Render New Review Form
router.get('/:id(\\d+)/reviews/new', asyncHandler(async (req, res) => {
    res.render('review-form', { title: "New Review" })
}));

//Submits New Review Form
router.post('/:id(\\d+)/reviews', asyncHandler(async (req, res) => {

}));

//Renders Edit Review Form
router.get('/:id(\\d+)/reviews/:id(\\d+)/edit', asyncHandler(async (req, res) => {

}));

//Submits Edit Review Form
router.patch('/:id(\\d+)/reviews/:id(\\d+)', asyncHandler(async (req, res) => {

}));

//deletes a review
router.delete('/:id(\\d+)/reviews/:id(\\d+)', asyncHandler(async (req, res) => {

}));



module.exports = router;