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
const { User, Review, Restaurant, userFavoriteRestaurant } = db;
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




module.exports = router;
