'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Amenities', [
      { amenity: "Test", createdAt: new Date(), updatedAt: new Date() },
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Amenities', null, {})
  }
};
