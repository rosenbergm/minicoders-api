module.exports = {
  up: async (queryInterface, Sequelize) => {
    const bCrypt = require('bcrypt-nodejs')
    const salt = bCrypt.genSaltSync()
    const passwordHash = await bCrypt.hashSync('test', salt, undefined)

    await queryInterface.bulkInsert('User', [{
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      password: passwordHash,
      salt: salt,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('User', null, {})
  }
};
