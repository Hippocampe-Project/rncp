'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('votes', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      titre: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      dossier_legislatif: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      numero_vote: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      date: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      num_votants: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      num_pour: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      num_contre: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      num_abstention: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      non_votants: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: true,
      },
      num_non_votants: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      adopte: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      num_absents: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      votants_pour: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: true,
      },
      votants_contre: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: true,
      },
      votants_abstention: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
    await queryInterface.removeColumn('votes', 'createdAt'),
    await queryInterface.removeColumn('votes', 'updatedAt')
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('votes');
  },
};
