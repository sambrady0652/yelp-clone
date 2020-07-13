'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('RestaurantKeywords', [
      { keyword: "testKeyword", createdAt: new Date(), updatedAt: new Date() }
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('RestaurantKeywords', null, {});
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
