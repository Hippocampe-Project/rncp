import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Logger } from "@nestjs/common";
import { Sequelize } from "sequelize-typescript";
import { ExpressAdapter } from "@nestjs/platform-express";
import { GlobalExceptionFilter } from "../global-exception.filter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter());

  const sequelize = app.get<Sequelize>(Sequelize);
  // await sequelize.sync({ force: false });
  console.log("Sequelize has been loaded!");

  // Cors = utile si le back et le front sont hébergés séparéments
  app.enableCors();

  // préfixe global = permet de centraliser les appels d'api askip
  // app.setGlobalPrefix('api');

  // Filtre global d'erreurs HTTP
  app.useGlobalFilters(new GlobalExceptionFilter());

  const port = process.env.PORT || 3000;
  await app.listen(port);

  Logger.log(`Application is running on: http://localhost:${port}`);
}

bootstrap();
