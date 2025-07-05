"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const apollo_1 = require("@nestjs/apollo");
const path_1 = require("path");
const depsearch_module_1 = require("./modules/depsearch/depsearch.module");
const sequelize_1 = require("@nestjs/sequelize");
const config_1 = require("@nestjs/config");
const database_config_1 = require("./database.config");
const deputes_model_1 = require("./models/deputes.model");
const votes_model_1 = require("./models/votes.model");
const scrutins_model_1 = require("./models/scrutins.model");
const partis_model_1 = require("./models/partis.model");
const departements_model_1 = require("./models/departements.model");
const commissions_p_model_1 = require("./models/commissions-p.model");
const user_model_1 = require("./models/user.model");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            graphql_1.GraphQLModule.forRoot({
                driver: apollo_1.ApolloDriver,
                autoSchemaFile: (0, path_1.join)(process.cwd(), "schema/schema.gql"),
                playground: true,
                debug: true,
            }),
            config_1.ConfigModule.forRoot({
                load: [database_config_1.default],
            }),
            sequelize_1.SequelizeModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: (configService) => ({
                    dialect: "postgres",
                    host: configService.get("database.host"),
                    port: configService.get("database.port"),
                    username: configService.get("database.username"),
                    password: configService.get("database.password"),
                    database: configService.get("database.database"),
                    autoLoadModels: true,
                    synchronize: false,
                    models: [
                        partis_model_1.Partis,
                        deputes_model_1.Deputes,
                        votes_model_1.Votes,
                        scrutins_model_1.Scrutins,
                        departements_model_1.Departements,
                        commissions_p_model_1.CommissionsPermanentes,
                        user_model_1.User,
                    ],
                    dialectOptions: {
                        ssl: {
                            require: true,
                            rejectUnauthorized: false,
                        },
                    },
                    pool: {
                        max: 5,
                        min: 0,
                        acquire: 30000,
                        idle: 10000,
                    },
                }),
                inject: [config_1.ConfigService],
            }),
            depsearch_module_1.DepsearchModule,
        ],
        providers: [database_config_1.DatabaseService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map