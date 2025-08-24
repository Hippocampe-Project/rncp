"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeConstraint("votes_deputes", "votes_deputes_vote_id_key").catch(() => {});
    await queryInterface.removeConstraint("votes_deputes", "votes_deputes_depute_id_key").catch(() => {});

    await queryInterface.addConstraint("votes_deputes", {
      fields: ["vote_id", "depute_id"],
      type: "unique",
      name: "votes_deputes_vote_id_depute_id",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint("votes_deputes", "votes_deputes_vote_id_depute_id");

  },
};
