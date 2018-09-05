'use strict';

const tasks = [
  {
    title: 'Hello world',
    problem: 'Pomocí funkce console.log("Text") vypiš do programu: Hello world',
    solution: '',
    test: 'consoleStack.includes("Hello world")',
    level: 1,
    points: 5
  },
  {
    title: 'Číslo',
    problem: 'Definuj proměnnou x a inicializuj jí číslem 10.',
    solution: 'let x = 10',
    test: 'x === 10',
    level: 1,
    points: 5
  },
  {
    title: 'Řetězec',
    problem: 'Definuj proměnnou x a inicializuj jí řezězcem Coder dojo (pozor na vélká a malá písmenka).',
    solution: 'let x = 10',
    test: 'x === "Coder dojo"',
    level: 1,
    points: 5
  }
]

module.exports = {
  up: async (queryInterface, Sequelize) => {
    tasks.map(task => {
      task.createdAt = new Date();
      task.updatedAt = new Date();
    })

    await queryInterface.bulkInsert('Task', tasks, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Task', null, {})
  }
};
