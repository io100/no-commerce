'use strict';
export default (sequelize, DataTypes) => {
  let analytics = sequelize.define('analytics', {
    subject: DataTypes.STRING,
    action: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    date: DataTypes.DATE
  }, {});
  analytics.associate = (models) => {
    // associations can be defined here
  };
  return analytics;
};