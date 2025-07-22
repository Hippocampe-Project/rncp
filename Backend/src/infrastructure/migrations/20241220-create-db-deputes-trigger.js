// "use strict";

// module.exports = {
//   up: async (queryInterface, Sequelize) => {
//     await queryInterface.sequelize.query(`
//             `);
//   },

//   down: async (queryInterface, Sequelize) => {
//     await queryInterface.sequelize.query(`
//       DROP TRIGGER IF EXISTS trigger_before_insert_deputes ON public.deputes;

//       -- Create the trigger on the deputes table
//       CREATE TRIGGER trigger_before_insert_deputes
//       BEFORE INSERT ON public.deputes
//       FOR EACH ROW
//       EXECUTE FUNCTION public.resolve_deputes_foreign_keys_insertions();    `);
//   },
// };
