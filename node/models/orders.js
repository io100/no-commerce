'use strict';
export default (sequelize, DataTypes) => {
  let orders = sequelize.define('orders', {
    user_id: DataTypes.INTEGER,
    billing_address_id: DataTypes.INTEGER,
    shipping_address_id: DataTypes.INTEGER,
    products: DataTypes.ARRAY(DataTypes.INTEGER),
    status: DataTypes.INTEGER,
    subtotal: DataTypes.FLOAT,
    taxable: DataTypes.BOOLEAN,
    shipping: DataTypes.FLOAT,
    total: DataTypes.FLOAT
  }, {});
  orders.associate = (models) => {
    // associations can be defined here
  };
  return orders;
};