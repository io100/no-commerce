'use strict';
module.exports = (sequelize, DataTypes) => {
  var settings = sequelize.define('settings', {
    name: DataTypes.STRING,
    value: DataTypes.STRING,
    active: DataTypes.BOOL
  }, {});
  settings.associate = function(models) {
    // associations can be defined here
  };
  return settings;
};