module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Project', [{
      title: 'Test',
      domain: 'localhost',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {})
    const projects = await queryInterface.sequelize.query('SELECT * FROM "Project"')

    queryInterface.bulkInsert('Page', [{
      title: 'Contact',
      slug: 'contact',
      projectId: projects[0][0].id,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      title: 'About us',
      slug: 'about-us',
      projectId: projects[0][0].id,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Page', null, {}) && queryInterface.bulkDelete('Project', null, {})
  }
};
