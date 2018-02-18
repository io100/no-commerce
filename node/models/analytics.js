'use strict';
module.exports = (sequelize, DataTypes) => {
  var analytics = sequelize.define('analytics', {
    subject: DataTypes.STRING,
    action: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    date: DataTypes.DATE
  }, {});
  analytics.associate = function(models) {
    // associations can be defined here
  };
  return analytics;
};