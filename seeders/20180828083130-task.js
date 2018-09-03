'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Task', [{
      title: 'Číslo 1',
      problem: 'Definuj proměnnou x a inicializuj jí číslem 10.',
      solution: 'let x = 10',
      test: 'x === 10',
      level: 1,
      points: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      title: 'Řetězec 1',
      problem: 'Definuj proměnnou x a inicializuj jí řezězcem Coder dojo (pozor na vélká a malá písmenka).',
      solution: 'let x = 10',
      test: 'x === "Coder dojo"',
      level: 1,
      points: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Task', null, {})
  }
};
