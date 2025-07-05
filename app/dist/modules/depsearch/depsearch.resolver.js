"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepsearchResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const depsearch_service_1 = require("./depsearch.service");
const votes_deputes_service_1 = require("./votes-deputes.service");
const common_1 = require("@nestjs/common");
const depsearch_errors_1 = require("./depsearch.errors");
const votes_deputes_model_1 = require("../../models/votes-deputes.model");
const votes_deputes_1 = require("../../DTO/votes-deputes");
let DepsearchResolver = class DepsearchResolver {
    constructor(depsearchService, votesDeputeService) {
        this.depsearchService = depsearchService;
        this.votesDeputeService = votesDeputeService;
        this.logger = common_1.Logger;
    }
    async depute(deputeName) {
        this.logger.debug({ deputeName }, "Trying to resolve Query.depsearch");
        const deputeId = await this.votesDeputeService.createPayload(deputeName);
        if (!deputeName) {
            throw new depsearch_errors_1.DeputeNotFoundError(deputeName);
        }
        return this.depsearchService.retrievePayload(deputeId);
    }
};
exports.DepsearchResolver = DepsearchResolver;
__decorate([
    (0, graphql_1.Query)(() => [votes_deputes_1.VoteDeputeDto], { nullable: true }),
    __param(0, (0, graphql_1.Args)("nom", { type: () => String })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DepsearchResolver.prototype, "depute", null);
exports.DepsearchResolver = DepsearchResolver = __decorate([
    (0, graphql_1.Resolver)(() => [votes_deputes_model_1.Votes_deputes]),
    __metadata("design:paramtypes", [depsearch_service_1.DepsearchService,
        votes_deputes_service_1.VotesDeputesService])
], DepsearchResolver);
//# sourceMappingURL=depsearch.resolver.js.map