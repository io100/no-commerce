'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('promotions', {
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
      starts: {
        type: Sequelize.DATE,
        allowNull: false
      },
      expires: {
        type: Sequelize.DATE,
         allowNull: true
      },
      type: {
        type: Sequelize.INTEGER,
         allowNull: false
      },
      applicable_products: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
         allowNull: true,
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
    return queryInterface.dropTable('promotions');
  }
};