'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('RestaurantKeywords', [
      { keyword: "Burger", createdAt: new Date(), updatedAt: new Date() },
      { keyword: "Pizza", createdAt: new Date(), updatedAt: new Date() },
      { keyword: "Chinese", createdAt: new Date(), updatedAt: new Date() },
      { keyword: "Tacos", createdAt: new Date(), updatedAt: new Date() },
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('RestaurantKeywords', null, {});
  }
};
