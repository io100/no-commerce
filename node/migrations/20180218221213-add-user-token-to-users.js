'use strict';

module.exports = {
up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('users', 'reset_password_token', Sequelize.STRING)
        .then(_ => queryInterface.addColumn('users', 'reset_token_expires', Sequelize.STRING))
    }, 

down: function (queryInterface, _Sequelize) {
    return queryInterface.removeColumn('users', 'reset_password_token')
        .then(_ => queryInterface.removeColumn('users', 'reset_token_expires'))
    },
};