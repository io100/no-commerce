'use strict';
export default (sequelize, DataTypes) => {
  let users = sequelize.define('users', {
    email: DataTypes.TEXT,
    password: DataTypes.TEXT,
    role: DataTypes.INTEGER,
    first_name: DataTypes.TEXT,
    last_name: DataTypes.TEXT,
    street_address_1: DataTypes.TEXT,
    street_address_2: DataTypes.TEXT,
    city: DataTypes.TEXT,
    state: DataTypes.TEXT,
    country: DataTypes.TEXT,
  }, {});
  users.associate = (models) => {
    // associations can be defined here
  };
  return users;
};