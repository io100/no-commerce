'use strict';
export default (sequelize, DataTypes) => {
  let api_keys = sequelize.define('api-keys', {
    api_key: DataTypes.STRING,
    expires: DataTypes.DATE,
    user_id: DataTypes.INTEGER
  }, {});
  api_keys.associate = function(models) {
    // associations can be defined here
  };
  return api_keys;
};