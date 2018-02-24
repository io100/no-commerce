'use strict';
export default (sequelize, DataTypes) => {
  let toOrders = sequelize.define('toOrders', {
    order_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  }, {});
  toOrders.associate = function(models) {
    // associations can be defined here
  };
  return toOrders;
};