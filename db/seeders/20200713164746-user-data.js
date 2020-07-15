'use strict';

const { query } = require("express");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      { email: 'test@gmail.com', hashedPassword: '$2a$05$LhayLxezLhK1LhWvKxCyLOj0j1u.Kj0jZ0pEmm134uzrQlFvQJLF6', firstName: 'Johnny', lastName: 'Bravo', city: 'Dallas', state: 'Texas', profilePicture: 'test1.com', createdAt: new Date(), updatedAt: new Date() }
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {})
  }
};
