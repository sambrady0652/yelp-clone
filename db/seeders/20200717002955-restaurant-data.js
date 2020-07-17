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
      {
        name: "MAK Restaurant",
        image_url: "https://s3-media4.fl.yelpcdn.com/bphoto/GJQCgfAFWnNx_iqL5hHEUA/o.jpg",
        keywordId: 3,
        latitude: 41.9032611,
        longitude: -87.6759818,
        transactions: ["pickup", "delivery"],
        price: "$$",
        address: "1924 W Division St, Chicago, IL 60622",
        phone: "+17737726251",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Shanghai Inn",
        image_url: "https://s3-media4.fl.yelpcdn.com/bphoto/XNxQpfA8mEhjXfL65Ko3GQ/o.jpg",
        keywordId: 3,
        latitude: 41.967647,
        longitude: -87.679002,
        transactions: ["pickup", "delivery"],
        price: "$$",
        address: "4723 N Damen Ave, Chicago, IL 60625",
        phone: "+17735613275",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Cheng Chopsticks",
        image_url: "https://s3-media3.fl.yelpcdn.com/bphoto/w2xGpdwU-YQvU2gkqkVhxw/o.jpg",
        keywordId: 3,
        latitude: 41.91716,
        longitude: -87.704205,
        transactions: ["pickup", "delivery"],
        price: "$",
        address: "3054 W Armitage Ave, Chicago, IL 60647",
        phone: "+17733841668",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Lao Peng You",
        image_url: "https://s3-media3.fl.yelpcdn.com/bphoto/beLCg97DzfpRGCZO10wC0A/o.jpg",
        keywordId: 3,
        latitude: 41.89610667,
        longitude: -87.67786167,
        transactions: ["pickup", "delivery"],
        price: "$$",
        address: "2020 W Chicago Ave, Chicago, IL 60622",
        phone: "+18722068624",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Xi'an Dynasty Cuisine",
        image_url: "https://s3-media2.fl.yelpcdn.com/bphoto/2y97AFq1eArX0lCUUBzJIg/o.jpg",
        keywordId: 3,
        latitude: 41.92228,
        longitude: -87.64465,
        transactions: ["pickup", "delivery"],
        price: "$$",
        address: "2218 N Lincoln Ave, Chicago, IL 60614",
        phone: "+17739047253",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Great Sea Restaurant",
        image_url: "https://s3-media2.fl.yelpcdn.com/bphoto/7CEbreU93HOBwlA49elgvA/o.jpg",
        keywordId: 3,
        latitude: 41.9683111314671,
        longitude: -87.7106371012279,
        transactions: ["pickup", "delivery"],
        price: "$$",
        address: "3253 W Lawrence Ave, Chicago, IL 60625",
        phone: "+17734789129",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "MingHin Cuisine",
        image_url: "https://s3-media2.fl.yelpcdn.com/bphoto/mFhgIM3zj5ztQPBKz0zTdg/o.jpg",
        keywordId: 3,
        latitude: 41.8532564325305,
        longitude: -87.6349026829699,
        transactions: ["pickup", "delivery"],
        price: "$$",
        address: "2168 S Archer Ave, Chicago, IL 60616",
        phone: "+13128081999",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Yummy Yummy Asian Cuisine",
        image_url: "https://s3-media1.fl.yelpcdn.com/bphoto/wZBZHmz8HJzTgAy6AEhPLQ/o.jpg",
        keywordId: 3,
        latitude: 41.935016,
        longitude: -87.644032,
        transactions: ["pickup", "delivery"],
        price: "$$",
        address: "2901 N Broadway St Chicago, IL 60657",
        phone: "+17735256677",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "MCCB Chicago",
        image_url: "https://s3-media2.fl.yelpcdn.com/bphoto/N6XozlzESAjPOFYoJQdHWQ/o.jpg",
        keywordId: 3,
        latitude: 41.8538027693794,
        longitude: -87.6336866427383,
        transactions: ["pickup", "delivery"],
        price: "$$",
        address: "2138 South Archer Ave, Chicago, IL 60616",
        phone: "+13128810168",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Restaurants', null, {});
  }
};

