const { default: databaseConfig } = require("./dist/config/database.config.js");

module.exports = {
  development: {
    ...databaseConfig().database,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
  test: {
    ...databaseConfig().database,
  },
  production: {
    ...databaseConfig().database,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
