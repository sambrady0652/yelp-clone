const { validationResult } = require('express-validator');
const { User, RestaurantKeyword } = require('./db/models');

const asyncHandler = (handler) => (req, res, next) => handler(req, res, next).catch(next);
const handleValidationErrors = (req, res, next) => {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
        const errors = validationErrors.array().map((error) => error.msg);

        const err = Error("Bad request.");
        err.status = 400;
        err.title = "Bad request.";
        err.errors = errors;
        res.status(400).json({ err });
    }
    next();
};

const emailNotUnique = async (email) => {
    const emails = await User.findAll().map((user) => user = user.email);
    return emails.includes(email);
};

const includesKeyword = async (keyword) => {
    const keywordObjs = await RestaurantKeyword.findAll();
    const keywords = keywordObjs.map((keyword) => keyword = keyword.title.toLowerCase());
    return keywords.includes(keyword.toLowerCase());
};

module.exports = {
    asyncHandler,
    handleValidationErrors,
    emailNotUnique,
    includesKeyword
}
