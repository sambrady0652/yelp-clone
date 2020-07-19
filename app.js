// - External Requirements
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
// const morgan = require('morgan');
const csurf = require('csurf');
// const path = require('path')

// - Internal Requirements
const { asyncHandler } = require('./utils');
const { environment } = require('./config');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const restaurantsRouter = require('./routes/restaurants');
const apiRouter = require('./routes/api')

// - Declarations
const csrfProtection = csurf({ cookie: true });
const app = express();
app.set('view engine', 'pug');

// - Application-wide Middleware
// app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));

// - Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/restaurants', restaurantsRouter);
app.use('/api', apiRouter)

//ERRORS
// Error Catch
app.use((req, res, next) => {
    const err = new Error('The requested page couldn\'t be found.');
    err.status = 404;
    next(err);
});

// Error Logger
app.use((err, req, res, next) => {
    if (environment === 'production' || environment === 'test') {
        // TODO Log the error to the database.
    } else {
        console.error(err);
    }
    next(err);
});

// 404 Error Handler
app.use((err, req, res, next) => {
    if (err.status === 404) {
        res.status(404);
        // TODO - Create 'page-not-found' view
        res.render('page-not-found', {
            title: 'Page Not Found',
        });
    } else {
        next(err);
    }
});

// Generic Error Handler
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    const isProduction = environment === 'production';
    // TODO - Create 'error' view
    res.render('error', {
        title: 'Server Error',
        message: isProduction ? null : err.message,
        stack: isProduction ? null : err.stack,
    });
});

module.exports = app;
