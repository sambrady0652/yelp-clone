// - External Requirements
const express = require('express');
const bcrypt = require('bcryptjs');
const csurf = require('csurf');
const cookieParser = require('cookie-parser');
const { check } = require('express-validator');

// - Internal Requirements
const { asyncHandler, handleValidationErrors } = require('../utils');
const db = require('../db/models');
const { getUserToken, requireAuth } = require('../auth');
const { sequelize } = require('../db/models');
const { environment, MapsSecretKey } = require('../config')

// - Declarations
const { User, Review, Restaurant, userFavoriteRestaurant, RestaurantKeyword } = db;
const router = express.Router();
const csrfProtection = csurf({ cookie: true });

// - Users-wide Middleware
router.use(requireAuth);
router.use(cookieParser());



router.get('/:id(\\d+)', asyncHandler(async (req, res) => {
    const restaurantId = parseInt(req.params.id, 10)
    const restaurant = await Restaurant.findOne({
        where: {
            id: restaurantId
        }
    })

    res.json({ restaurant })
}))

router.get('/key', asyncHandler(async (req, res) => {

    const key = MapsSecretKey.MAPS_SECRET_KEY;


    res.json({ key })
}))

router.post('/search', asyncHandler(async (req, res) => {
    console.log("INSIDE API ROUTE-------------")
    const { keyword } = req.body;
    if (keyword === "") {
        const popularRestaurant = await Restaurant.findOne();
        res.json({ popularRestaurant });
    }
    else {
        const searchTerm = await RestaurantKeyword.findOne({ where: { keyword: keyword.toLowerCase() } });
        const restaurants = await Restaurant.findAll({ where: { keywordId: searchTerm.id } });
        res.json({ restaurants });
    }
}));

module.exports = router;
