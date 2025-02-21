"use strict";

module.exports = {
  async up(queryInterface) {
    await queryInterface.addColumn("votes", "deputeId", {
      type: DataTypes.INTEGER,
      allowNull: true, // Ensure every vote is linked to a depute
      references: {
        model: "deputes", // Table name (must match DB table name)
        key: "id", // The referenced column in the "deputes" table
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE", // If a depute is deleted, delete their votes too
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Deputes", "activite");
  },
};
