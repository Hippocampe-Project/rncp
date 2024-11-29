
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('departements', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      nom: {
        type: Sequelize.STRING,
        allowNull: false
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('departements');
  }
};
