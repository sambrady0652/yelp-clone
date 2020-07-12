'use strict';
module.exports = (sequelize, DataTypes) => {
  const userFavoriteRestaurant = sequelize.define('userFavoriteRestaurant', {
    restaurantId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    keywordId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  userFavoriteRestaurant.associate = function (models) {
    userFavoriteRestaurant.belongsTo(models.User, { foreignKey: "userId" });
    userFavoriteRestaurant.belongsTo(models.Restaurant, { foreignKey: "restaurantId" });
  };
  return userFavoriteRestaurant;
};