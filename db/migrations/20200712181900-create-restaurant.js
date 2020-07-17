'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Restaurants', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      image_url: {
        type: Sequelize.STRING
      },
      keywordId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: "RestaurantKeywords" }
      },
      price: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      latitude: {
<<<<<<< HEAD
        type: Sequelize.NUMERIC(16, 14)
      },
      longitude: {
=======
        allowNull: false,
        type: Sequelize.NUMERIC(16, 14)
      },
      longitude: {
        allowNull: false,
>>>>>>> master
        type: Sequelize.NUMERIC(16, 14)
      },
      transactions: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Restaurants');
  }
};