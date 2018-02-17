'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
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
      email: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      password: {
        allowNull: true, 
        type: Sequelize.TEXT
      },
      role: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      first_name: {
        allowNull: true, 
        type: Sequelize.TEXT
      },
      last_name: {
        allowNull: true,
        type: Sequelize.TEXT
      },
      street_address_1: {
        allowNull: true,
        type: Sequelize.TEXT
      },
      street_address_2: {
        allowNull: true, 
        type: Sequelize.TEXT
      },
      city: {
        allowNull: true,
        type: Sequelize.TEXT
      },
      state: {
        allowNull: true, 
        type: Sequelize.TEXT
      },
      country: {
        allowNull: true, 
        type: Sequelize.TEXT
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users');
  }
};