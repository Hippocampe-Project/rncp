import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';

async function bootstrap() {
  
  const app = await NestFactory.create(AppModule);

  const sequelize = app.get<Sequelize>(Sequelize);
  await sequelize.sync({ alter: true });
  console.log('Sequelize has been synced!');
  
  // Cors = utile si le back et le front sont hébergés séparéments

  // app.enableCors();

  // préfixe global = permet de centraliser les appels d'api askip

  // app.setGlobalPrefix('api');

  const port = process.env.PORT || 3000;
  await app.listen(port);
  
  Logger.log(`Application is running on: http://localhost:${port}`);
}

bootstrap();