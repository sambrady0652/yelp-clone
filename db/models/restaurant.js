'use strict';
module.exports = (sequelize, DataTypes) => {
  const Restaurant = sequelize.define('Restaurant', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    keywordId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    latitude: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    longitude: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false
    },
    website: DataTypes.STRING,
    phoneNumber: DataTypes.INTEGER,
    amenityId: DataTypes.INTEGER
  }, {});
  Restaurant.associate = function (models) {
    const columnMapping = {
      through: "userFavoriteRestaurant",
      foreignKey: "restaurantId",
      otherKey: "userId"
    }
    const columnMapping2 = {
      through: "RestaurantAmenity",
      foreignKey: "restaurantId",
      otherKey: "amenitiesId"

    }
    Restaurant.belongsTo(models.RestaurantKeyword, { foreignKey: "keywordId" });
    Restaurant.belongsToMany(models.User, columnMapping);
    Restaurant.hasMany(models.Review, { foreignKey: "restaurantId" });
    Restaurant.belongsToMany(models.Amenity, columnMapping2);
  };
  return Restaurant;
};