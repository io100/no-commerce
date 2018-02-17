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
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      name: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      msrp: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      street: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      description: {
        allowNull: true,
        type: Sequelize.TEXT
      },
      length: {
        allowNull: true,
        type: Sequelize.TEXT
      },
      width: {
        allowNull: true, 
        type: Sequelize.TEXT
      },
      height: {
        allowNull: true,
        type: Sequelize.TEXT
      },
      discontinue_date: {
        allowNull: true, 
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('products');
  }
};