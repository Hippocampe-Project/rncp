"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
      CREATE TABLE votes_deputes (
        vote_id INT NOT NULL,
        depute_id INT NOT NULL,
        status VARCHAR(255) NOT NULL, -- "pour", "contre", "abstention", "non_votant", "absent"
        depute_nom VARCHAR(255) NOT NULL,
        vote_titre TEXT NOT NULL,
        PRIMARY KEY (vote_id, depute_id),
        FOREIGN KEY (vote_id) REFERENCES votes(id) ON DELETE CASCADE,
        FOREIGN KEY (depute_id) REFERENCES deputes(id) ON DELETE CASCADE
      );
    `);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`DROP TABLE votes_deputes;`);
  },
};
