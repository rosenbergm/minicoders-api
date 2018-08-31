'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Task', [{
      problem: 'Vypis cislo 1 do konzole.',
      solution: 'console.log(1);',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Task', null, {})
  }
};
