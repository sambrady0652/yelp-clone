'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Reviews', [
      { userId: 1, restaurantId: 1, content: "This is a good test review!", rating: 5, createdAt: new Date(), updatedAt: new Date() },
      { userId: 2, restaurantId: 2, content: "This is a bad test review!", rating: 2, createdAt: new Date(), updatedAt: new Date() },

    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Reviews')
  }
};
