'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('UserTask', [{
      progress: 'console.lo',
      taskId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.bulkDelete('UserTask', null, {})
  }
};
