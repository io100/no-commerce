'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      msrp: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      street: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      length: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      width: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      height: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      discontinue_date: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      images_array: {
        type: Sequelize.ARRAY(Sequelize.TEXT)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('products');
  }
};