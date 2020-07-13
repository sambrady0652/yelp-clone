// - External Requirements
const express = require('express');
const csurf = require('csurf');
const { check, validationResults } = require('express-validator');

// - Internal Requirements
const { asyncHandler } = require('../utils');
const db = require('../db/models');


// - Declarations
const { User } = db;
const router = express.Router();
const csrfProtection = csrf({ cookie: true });

//






module.exports = router;