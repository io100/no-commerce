'use strict';
export default (sequelize, DataTypes) => {
  let attachments = sequelize.define('attachments', {
    type: DataTypes.STRING,
    catagory: DataTypes.STRING,
    value: DataTypes.STRING,
    object_id: DataTypes.INTEGER,
    attachment_id: DataTypes.INTEGER
  }, {});
  attachments.associate = (models) => {
    // associations can be defined here
  };
  return attachments;
};