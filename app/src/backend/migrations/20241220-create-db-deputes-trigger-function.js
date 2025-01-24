// "use strict";

// module.exports = {
//   up: async (queryInterface, Sequelize) => {
//     await queryInterface.sequelize.query(`
//       CREATE OR REPLACE FUNCTION resolve_deputes_foreign_keys_insertions()
//       RETURNS TRIGGER AS $$
//       BEGIN
//           -- Check and set departement_id
//           PERFORM id FROM departements WHERE nom = NEW.departement_id;
//           IF NOT FOUND THEN
//               RAISE EXCEPTION 'Departement % not found', NEW.departement_id;
//           ELSE
//               SELECT id INTO NEW.departement_id FROM departements WHERE nom = NEW.departement_id LIMIT 1;
//           END IF;

//           -- Check and set commissionPermanente_id
//           PERFORM id FROM commission_p WHERE nom = NEW.commissionPermanente_id;
//           IF NOT FOUND THEN
//               RAISE EXCEPTION 'Commission Permanente % not found', NEW.commissionPermanente_id;
//           ELSE
//               SELECT id INTO NEW.commissionPermanente_id FROM commission_p WHERE nom = NEW.commissionPermanente_id LIMIT 1;
//           END IF;

//           -- Check and set parti_id
//           PERFORM id FROM partis WHERE nom = NEW.parti_id;
//           IF NOT FOUND THEN
//               RAISE EXCEPTION 'Parti % not found', NEW.parti_id;
//           ELSE
//               SELECT id INTO NEW.parti_id FROM partis WHERE nom = NEW.parti_id LIMIT 1;
//           END IF;

//           -- Return the modified NEW row
//           RETURN NEW;
//       END;
//       $$ LANGUAGE plpgsql;

//     `);
//   },

//   down: async (queryInterface, Sequelize) => {
//     await queryInterface.sequelize.query(`
//       DROP FUNCTION IF EXISTS resolve_deputes_foreign_keys_insertions();
//     `);
//   },
// };
