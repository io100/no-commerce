'use strict';
module.exports = (sequelize, DataTypes) => {
  var create - user - token = sequelize.define('create-user-token', {
    user_id: DataTypes.INTEGER,
    reset_password_token: DataTypes.STRING,
    reset_password_expires: DataTypes.DATE
  }, {});
  create - user - token.associate = function(models) {
    // associations can be defined here
  };
  return create - user - token;
};