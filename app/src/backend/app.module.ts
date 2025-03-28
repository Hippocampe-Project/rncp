import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { join } from "path";
import { DepsearchModule } from "./modules/depsearch/depsearch.module";
import { SequelizeModule } from "@nestjs/sequelize";
import { ConfigModule, ConfigService } from "@nestjs/config";
import databaseConfig, { DatabaseService } from "./config/database.config";
import { Deputes } from "./models/deputes.model";
import { Votes } from "./models/votes.model";
import { Scrutins } from "./models/scrutins.model";
// import { DeputeRepository } from './repositories/deputes.repository';
import { VoteRepository } from "./repositories/votes.repository";
import { PartiRepository } from "./repositories/partis.repository";
import { Partis } from "./models/partis.model";
import { Departements } from "./models/departements.model";
import { CommissionsPermanentes } from "./models/commissions-p.model";

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), "schema/schema.gql"), // Auto-generate schema
      playground: true, // Enables GraphQL Playground (UI)
      debug: true, // Debugging mode for development
    }),
    ConfigModule.forRoot({
      load: [databaseConfig],
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        dialect: "postgres",
        host: configService.get<string>("database.host"),
        port: configService.get<number>("database.port"),
        username: configService.get<string>("database.username"),
        password: configService.get<string>("database.password"),
        database: configService.get<string>("database.database"),
        autoLoadModels: true,
        synchronize: false,
        models: [
          Partis,
          Deputes,
          Votes,
          Scrutins,
          Departements,
          CommissionsPermanentes,
        ],
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false, // Set this to true with CA certificates
          },
        },
        pool: {
          max: 5, // Maximum number of connection in pool
          min: 0, // Minimum number of connection in pool
          acquire: 30000, // Maximum time (ms) that pool will try to get connection before throwing error
          idle: 10000, // Maximum time (ms) that a connection can be idle before being released
        },
      }),
      inject: [ConfigService],
    }),
    DepsearchModule,
  ],
  providers: [DatabaseService],
})
export class AppModule {}
