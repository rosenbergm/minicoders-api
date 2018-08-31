'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Task', [{
      title: 'Proměnná',
      problem: 'Definuj proměnnou x a inicializuj jí číslem 10.',
      solution: 'let x = 10',
      test: 'x === 10',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Task', null, {})
  }
};
