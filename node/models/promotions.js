'use strict';
export default (sequelize, DataTypes) => {
  let promotions = sequelize.define('promotions', {
    name: DataTypes.TEXT,
    starts: DataTypes.DATE,
    expires: DataTypes.DATE,
    type: DataTypes.INTEGER,
    applicable_products: DataTypes.ARRAY(DataTypes.INTEGER)
  }, {});
  promotions.associate = (models) =>
   {
    // associations can be defined here
  };
  return promotions;
};