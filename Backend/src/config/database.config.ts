import { Injectable, OnModuleInit } from "@nestjs/common";
import { Sequelize } from "sequelize-typescript";

const port = process.env.DATABASE_PORT;

if (!port) {
  throw new Error("DATABASE_PORT is not defined");
}

export default () => {
  console.log(
    "Loaded DB password.",
    //process.env.DATABASE_PASSWORD,
    "Loaded DB user.",
    //process.env.DATABASE_USER,
  ); // <-- TEMP DEBUG
  return {
    database: {
      dialect: "postgres",
      host: process.env.DATABASE_HOST,
      port: parseInt(port, 10) || 5432,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
    },
  };
};

@Injectable()
export class DatabaseService implements OnModuleInit {
  constructor(private sequelize: Sequelize) {}

  async onModuleInit() {
    try {
      await this.sequelize.authenticate();
      console.log("Connection has been established successfully.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  }
}
