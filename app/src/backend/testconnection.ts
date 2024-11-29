// import { Sequelize } from "sequelize-typescript";

// async function testConnection() {
//     const sequelize = new Sequelize({
//       dialect: 'postgres',
//       host: process.env.DATABASE_HOST,
//       port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
//       username: process.env.DATABASE_USER,
//       password: process.env.DATABASE_PASSWORD,
//       database: process.env.DATABASE_NAME,
//       dialectOptions: {
//         ssl: {
//           require: true,
//           rejectUnauthorized: false, // Accept self-signed certificates
//         },
//       },
//     });
  
//     try {
//       await sequelize.authenticate();
//       console.log('Connection has been established successfully.');
//     } catch (error) {
//       console.error('Unable to connect to the database:', error);
//     } finally {
//       await sequelize.close();
//     }
//   }
  
//   testConnection();