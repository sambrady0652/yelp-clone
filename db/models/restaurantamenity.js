'use strict';
module.exports = (sequelize, DataTypes) => {
  const RestaurantAmenity = sequelize.define('RestaurantAmenity', {
    restaurantId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    amenitiesId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    amenityValue: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {});
  RestaurantAmenity.associate = function (models) {
    RestaurantAmenity.belongsTo(models.Restaurant, { foreignKey: "restaurantId" });
    RestaurantAmenity.belongsTo(models.Amenity, { foreignKey: "amenitiesId" });
  };
  return RestaurantAmenity;
};