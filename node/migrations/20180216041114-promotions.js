'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('promos', {
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
      starts: {
        allowNull: false,
        type: Sequelize.DATE
      },
      expires: {
        allowNull: false,
        type: Sequelize.DATE
      },
      type: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      applicable_products: {
        allowNull: true,
        type: Sequelize.ARRAY(Sequelize.TEXT) 
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('promos');
  }
};
