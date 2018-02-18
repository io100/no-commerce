'use strict';
module.exports = (sequelize, DataTypes) => {
  var promotions = sequelize.define('promotions', {
    name: DataTypes.TEXT,
    starts: DataTypes.DATE,
    expires: DataTypes.DATE,
    type: DataTypes.INTEGER,
    applicable_products: DataTypes.ARRAY
  }, {});
  promotions.associate = function(models) {
    // associations can be defined here
  };
  return promotions;
};