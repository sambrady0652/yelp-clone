'use strict';
module.exports = (sequelize, DataTypes) => {
  const RestaurantKeyword = sequelize.define('RestaurantKeyword', {
    keyword: DataTypes.STRING
  }, {});
  RestaurantKeyword.associate = function (models) {
    RestaurantKeyword.hasMany(models.Restaurant, { foreignKey: "keywordId" });
  };
  return RestaurantKeyword;
};