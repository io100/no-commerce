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
      email: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      password: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      role: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      first_name: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      last_name: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      street_address_1: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      street_address_2: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      city: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      state: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      country: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      cell_phone_number: {
        allowNull:true,
        type: Sequelize.TEXT
      },
      home_phone_number: {
        allowNull:true,
        type: Sequelize.TEXT
      },
      work_phone_number: {
        allowNull:true,
        type: Sequelize.TEXT
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
    return queryInterface.dropTable('users');
  }
};