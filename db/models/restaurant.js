'use strict';
module.exports = (sequelize, DataTypes) => {
  const Restaurant = sequelize.define('Restaurant', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image_url: {
      type: DataTypes.STRING
    },
    keywordId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.STRING,
      allowNull: false
    },
    latitude: {
      type: DataTypes.NUMERIC(16, 14),
      allowNull: false
    },
    longitude: {
      type: DataTypes.NUMERIC(16, 14),
      allowNull: false
    },
    transactions: {
      type: DataTypes.STRING
    },
    address: {
      type: DataTypes.STRING
    },
    phone: DataTypes.STRING
  }, {});
  Restaurant.associate = function (models) {
    const columnMapping = {
      through: "userFavoriteRestaurant",
      foreignKey: "restaurantId",
      otherKey: "userId"
    }
    Restaurant.belongsTo(models.RestaurantKeyword, { foreignKey: "keywordId" });
    Restaurant.belongsToMany(models.User, columnMapping);
    Restaurant.hasMany(models.Review, { foreignKey: "restaurantId" });
  };
  return Restaurant;
};