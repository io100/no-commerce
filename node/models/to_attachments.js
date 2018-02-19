'use strict';
module.exports = (sequelize, DataTypes) => {
  var to_attachments = sequelize.define('to_attachments', {
    object_id: DataTypes.INTEGER,
    attachment_id: DataTypes.INTEGER,
    type: DataTypes.STRING
  }, {});
  to_attachments.associate = function(models) {
    // associations can be defined here
  };
  return to_attachments;
};