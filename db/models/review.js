'use strict';
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    restaurantId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    photos: DataTypes.STRING,
    coolCount: DataTypes.INTEGER,
    funnyCount: DataTypes.INTEGER,
    usefulCount: DataTypes.INTEGER
  }, {});
  Review.associate = function (models) {
    Review.belongsTo(models.Restaurant, { foreignKey: "restaurantId" });
    Review.belongsTo(models.User, { foreignKey: "userId" });
  };
  return Review;
};