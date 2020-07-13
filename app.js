const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });
const { asyncHandler } = require('./utils')

const { environment } = require('./config')

const app = express();
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'pug');

app.get('/', (req, res) => {
    res.send('Hello World!')
});


module.exports = app;
