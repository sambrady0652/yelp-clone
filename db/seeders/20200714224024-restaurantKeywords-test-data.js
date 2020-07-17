'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('RestaurantKeywords', [
      { keyword: "burger", createdAt: new Date(), updatedAt: new Date() },
      { keyword: "pizza", createdAt: new Date(), updatedAt: new Date() },
      { keyword: "chinese", createdAt: new Date(), updatedAt: new Date() },
      { keyword: "tacos", createdAt: new Date(), updatedAt: new Date() },
      { keyword: "italian", createdAt: new Date(), updatedAt: new Date() },
      { keyword: "chicken", createdAt: new Date(), updatedAt: new Date() },
      { keyword: "spanish", createdAt: new Date(), updatedAt: new Date() },
      { keyword: "greek", createdAt: new Date(), updatedAt: new Date() },
      { keyword: "healthy", createdAt: new Date(), updatedAt: new Date() },
      { keyword: "vegetarian", createdAt: new Date(), updatedAt: new Date() },
      { keyword: "mexican", createdAt: new Date(), updatedAt: new Date() },
      { keyword: "sushi", createdAt: new Date(), updatedAt: new Date() },
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('RestaurantKeywords', null, {});
  }
};
