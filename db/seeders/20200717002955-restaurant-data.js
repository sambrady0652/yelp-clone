'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Restaurants', [
      {
        name: "Wonder Chop",
        image_url: "https://s3-media1.fl.yelpcdn.com/bphoto/pRYtVqRLWy-VnqSgWEeUGw/o.jpg",
        keywordId: 3,
        price: "$$",
        latitude: 41.92522,
        longitude: -87.68845,
        transactions: ["delivery"],
        address: "2418 W Fullerton Ave, Chicago, IL 60647",
        phone: "(773) 384-6499",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Paula & Monica's Pizzeria",
        image_url: "https://s3-media1.fl.yelpcdn.com/bphoto/nCRLW5q3PRDSSvKfo8Qdhg/o.jpg",
        keywordId: 2,
        price: "$",
        latitude: 41.89635,
        longitude: -87.6656299,
        transactions: ["pickup", "delivery"],
        address: "1518 W Chicago Ave, Chicago, IL 60642",
        phone: "(312) 929-3615",
        createdAt: new Date(),
        updatedAt: new Date()
      },

    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Restaurants', null, {});
  }
};

