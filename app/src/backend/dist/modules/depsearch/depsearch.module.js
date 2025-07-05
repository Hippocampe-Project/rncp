"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepsearchModule = void 0;
const common_1 = require("@nestjs/common");
const depsearch_resolver_1 = require("./depsearch.resolver");
const depsearch_service_1 = require("./depsearch.service");
const deputes_repository_1 = require("../../repositories/deputes.repository");
const sequelize_1 = require("@nestjs/sequelize");
const deputes_model_1 = require("../../models/deputes.model");
const votes_repository_1 = require("../../repositories/votes.repository");
const votes_model_1 = require("../../models/votes.model");
const votes_deputes_service_1 = require("./votes-deputes.service");
const votes_deputes_repository_1 = require("../../repositories/votes-deputes.repository");
const votes_deputes_model_1 = require("../../models/votes-deputes.model");
let DepsearchModule = class DepsearchModule {
};
exports.DepsearchModule = DepsearchModule;
exports.DepsearchModule = DepsearchModule = __decorate([
    (0, common_1.Module)({
        imports: [sequelize_1.SequelizeModule.forFeature([deputes_model_1.Deputes, votes_model_1.Votes, votes_deputes_model_1.Votes_deputes])],
        providers: [
            depsearch_resolver_1.DepsearchResolver,
            votes_deputes_service_1.VotesDeputesService,
            depsearch_service_1.DepsearchService,
            votes_deputes_repository_1.VotesDeputesRepository,
            deputes_repository_1.DeputeRepository,
            votes_repository_1.VoteRepository,
        ],
        exports: [deputes_repository_1.DeputeRepository, votes_repository_1.VoteRepository, votes_deputes_repository_1.VotesDeputesRepository],
    })
], DepsearchModule);
//# sourceMappingURL=depsearch.module.js.map