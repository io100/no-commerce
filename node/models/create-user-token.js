'use strict';
export default (sequelize, DataTypes) => {
  let create_user_token = sequelize.define('create-user-token', {
    user_id: DataTypes.INTEGER,
    reset_password_token: DataTypes.STRING,
    reset_password_expires: DataTypes.DATE
  }, {});
  create_user_token.associate = (models) => {
    // associations can be defined here
  };
  return create_user_token;
};