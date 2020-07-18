const { validationResult } = require('express-validator');
const { User } = require('./db/models');

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
}

module.exports = {
    asyncHandler,
    handleValidationErrors,
    emailNotUnique
}
