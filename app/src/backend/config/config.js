
require('dotenv').config();

module.exports = {
  development: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USER,
    password: parseInt(process.env.DATABASE_PASSWORD),
    database: process.env.DATABASE_NAME,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
};

