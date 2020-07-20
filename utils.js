const { validationResult, check } = require('express-validator');
const { User, RestaurantKeyword, userFavoriteRestaurant } = require('./db/models');

const asyncHandler = (handler) => (req, res, next) => handler(req, res, next).catch(next);

const validateEmailAndPassword = [
    check("email")
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage("Please provide a valid email."),
    check("password")
        .exists({ checkFalsy: true })
        .withMessage("Please provide a password.")
];

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

const isFavorited = async (userId, restaurantId) => {
    const favorites = await userFavoriteRestaurant.findAll({ where: { userId: userId } });
    const favIds = favorites.map((fav) => fav = fav.restaurantId);
    return favIds.includes(restaurantId);
};

const topChoiceFinder = async () => {
    const favorites = await userFavoriteRestaurant.findAll();
}

module.exports = {
    asyncHandler,
    handleValidationErrors,
    emailNotUnique,
    includesKeyword,
    isFavorited,
    topChoiceFinder,
    validateEmailAndPassword
}
