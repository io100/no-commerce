'use strict';
module.exports = (sequelize, DataTypes) => {
  var attachments = sequelize.define('attachments', {
    type: DataTypes.STRING,
    catagory: DataTypes.STRING,
    value: DataTypes.STRING,
    object_id: DataTypes.INTEGER,
    attachment_id: DataTypes.INTEGER
  }, {});
  attachments.associate = function(models) {
    // associations can be defined here
  };
  return attachments;
};