//External Modules
const express = require('express');
const cookieParser = require('cookie-parser');

//Internal Modules
const { asyncHandler } = require('../utils');
const { Restaurant } = require('../db/models');
const { requireAuth } = require('../auth');
const { MapsSecretKey } = require('../config')
const router = express.Router();

//Middleware
router.use(requireAuth);
router.use(cookieParser());

// Retreives Map API Secret Key 
router.get('/key', asyncHandler(async (req, res) => {
    const key = MapsSecretKey.MAPS_SECRET_KEY;
    res.json({ key })
}));

//Retreives Restaurant ID, sends to Map.js Module to place pin on map
router.get('/:id(\\d+)', asyncHandler(async (req, res) => {
    const restaurantId = parseInt(req.params.id, 10)
    const restaurant = await Restaurant.findOne({
        where: {
            id: restaurantId
        }
    });
    res.json({ restaurant })
}));

module.exports = router;
