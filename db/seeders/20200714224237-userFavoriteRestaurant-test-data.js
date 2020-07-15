'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('userFavoriteRestaurants', [
      { restaurantId: 1, userId: 1, keywordId: 1, createdAt: new Date(), updatedAt: new Date() }
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('userFavoriteRestaurants', null, {});
  }
};
