'use strict';
export default (sequelize, DataTypes) => {
  let toOrders = sequelize.define('to_orders', {
    order_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  }, {});
  toOrders.associate = function(models) {
    // associations can be defined here
  };
  return toOrders;
};