"use strict";

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.sequelize.query(`
      BEGIN;

      -- commissions_p
      CREATE TABLE commissions_p (
        id SERIAL PRIMARY KEY,
        nom VARCHAR NOT NULL,
        objet VARCHAR NOT NULL,
        deputes TEXT[],
        logo VARCHAR,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );

      -- departements
      CREATE TABLE departements (
        id SERIAL PRIMARY KEY,
        nom VARCHAR NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );

      -- partis
      CREATE TABLE partis (
        id SERIAL PRIMARY KEY,
        nom VARCHAR NOT NULL,
        president VARCHAR,
        title VARCHAR NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );

      -- deputes
      CREATE TABLE deputes (
        id SERIAL PRIMARY KEY,
        nom VARCHAR NOT NULL,
        date_naissance VARCHAR NOT NULL,
        sexe VARCHAR NOT NULL,
        departement_id INTEGER NOT NULL REFERENCES departements(id),
        circonscription VARCHAR NOT NULL,
        commission_permanente_id INTEGER REFERENCES commissions_p(id),
        profession VARCHAR NOT NULL,
        suppleant VARCHAR,
        parti_id INTEGER NOT NULL REFERENCES partis(id),
        photo VARCHAR,
        activite BOOLEAN DEFAULT TRUE NOT NULL,
        activite_timestamp TIMESTAMP,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );

      -- scrutins
      CREATE TABLE scrutins (
        id SERIAL PRIMARY KEY,
        titre VARCHAR NOT NULL,
        dossier_legislatif VARCHAR,
        date VARCHAR NOT NULL,
        nom VARCHAR NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );

      -- votes
      CREATE TABLE votes (
        id SERIAL PRIMARY KEY,
        titre VARCHAR NOT NULL,
        dossier_legislatif VARCHAR,
        numero_vote VARCHAR NOT NULL,
        date VARCHAR NOT NULL,
        num_votants INTEGER NOT NULL,
        num_pour INTEGER NOT NULL,
        num_contre INTEGER NOT NULL,
        num_abstention INTEGER NOT NULL,
        non_votants TEXT[] NOT NULL,
        num_non_votants INTEGER NOT NULL,
        adopte BOOLEAN,
        num_absents INTEGER NOT NULL,
        votants_pour TEXT[] NOT NULL,
        votants_contre TEXT[] NOT NULL,
        votants_abstention TEXT[] NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );

      -- votes_deputes
      CREATE TABLE votes_deputes (
        vote_id INTEGER NOT NULL REFERENCES votes(id),
        depute_id INTEGER NOT NULL REFERENCES deputes(id),
        vote_category VARCHAR NOT NULL,
        depute_nom VARCHAR NOT NULL,
        vote_titre VARCHAR NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        PRIMARY KEY (vote_id, depute_id)
      );

      COMMIT;
    `);
  },

  down: async (queryInterface) => {
    await queryInterface.sequelize.query(`
      BEGIN;
      DROP TABLE IF EXISTS votes_deputes;
      DROP TABLE IF EXISTS votes;
      DROP TABLE IF EXISTS scrutins;
      DROP TABLE IF EXISTS deputes;
      DROP TABLE IF EXISTS partis;
      DROP TABLE IF EXISTS departements;
      DROP TABLE IF EXISTS commissions_p;
      COMMIT;
    `);
  },
};
