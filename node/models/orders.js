'use strict';
module.exports = (sequelize, DataTypes) => {
  var orders = sequelize.define('orders', {
    user_id: DataTypes.INTEGER,
    billing_address_id: DataTypes.INTEGER,
    shipping_address_id: DataTypes.INTEGER,
    products: DataTypes.ARRAY,
    status: DataTypes.INTEGER,
    subtotal: DataTypes.FLOAT,
    taxable: DataTypes.BOOL,
    shipping: DataTypes.FLOAT,
    total: DataTypes.FLOAT
  }, {});
  orders.associate = function(models) {
    // associations can be defined here
  };
  return orders;
};