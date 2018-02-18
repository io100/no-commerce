'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER
      },
      billing_address_id: {
        type: Sequelize.INTEGER
      },
      shipping_address_id: {
        type: Sequelize.INTEGER
      },
      products: {
        type: Sequelize.ARRAY
      },
      status: {
        type: Sequelize.INTEGER
      },
      subtotal: {
        type: Sequelize.FLOAT
      },
      taxable: {
        type: Sequelize.BOOL
      },
      shipping: {
        type: Sequelize.FLOAT
      },
      total: {
        type: Sequelize.FLOAT
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
    return queryInterface.dropTable('orders');
  }
};