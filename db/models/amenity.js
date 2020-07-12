'use strict';
module.exports = (sequelize, DataTypes) => {
  const Amenity = sequelize.define('Amenity', {
    amenity: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, {});
  Amenity.associate = function (models) {
    const columnMapping = {
      through: "RestaurantAmenity",
      foreignKey: "amenityId",
      otherKey: "restaurantId"
    }
    Amenity.belongsToMany(models.Restaurant, columnMapping);
  };
  return Amenity;
};