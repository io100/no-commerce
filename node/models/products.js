'use strict';
module.exports = (sequelize, DataTypes) => {
  var products = sequelize.define('products', {
    name: DataTypes.TEXT,
    msrp: DataTypes.FLOAT,
    street: DataTypes.FLOAT,
    description: DataTypes.TEXT,
    length: DataTypes.TEXT,
    width: DataTypes.TEXT,
    height: DataTypes.TEXT,
    discontinue_date: DataTypes.TEXT,
    images_array: DataTypes.ARRAY
  }, {});
  products.associate = function(models) {
    // associations can be defined here
  };
  return products;
};