'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Restaurants', [{
      name: 'testName',
      keywordId: 1,
      latitude: 1,
      longitude: 1,
      city: 'testCity',
      state: 'testState',
      website: 'testWebsite',
      phoneNumber: 1,
      amenityId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Restaurants', null, {});
  }
};

