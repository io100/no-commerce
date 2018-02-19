'use strict';
export default (sequelize, DataTypes) => {
  let attachments = sequelize.define('attachments', {
    type: DataTypes.STRING,
    category: DataTypes.STRING,
    value: DataTypes.STRING,
  }, {});
  attachments.associate = (models) => {
    // associations can be defined here
  };
  return attachments;
};