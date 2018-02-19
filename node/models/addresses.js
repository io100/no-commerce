'use strict';
export default (sequelize, DataTypes) => {
  let addresses = sequelize.define('addresses', {
    first_name: DataTypes.TEXT,
    last_name: DataTypes.TEXT,
    street_address_1: DataTypes.TEXT,
    street_address_2: DataTypes.TEXT,
    city: DataTypes.TEXT,
    state: DataTypes.TEXT,
    country: DataTypes.TEXT,
    phone_number: DataTypes.TEXT,
    taxable: DataTypes.BOOLEAN
  }, {});
  addresses.associate = function(models) {
    // associations can be defined here
  };
  return addresses;
};