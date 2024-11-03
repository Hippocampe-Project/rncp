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
const deputes_model_1 = require("../../models/deputes.model");
let DepsearchResolver = class DepsearchResolver {
    constructor(depsearchService) {
        this.depsearchService = depsearchService;
    }
    async depute(deputeId) {
        return this.depsearchService.findDepute(deputeId);
    }
};
exports.DepsearchResolver = DepsearchResolver;
__decorate([
    (0, graphql_1.Query)(() => deputes_model_1.Deputes, { nullable: true }),
    __param(0, (0, graphql_1.Args)("id", { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], DepsearchResolver.prototype, "depute", null);
exports.DepsearchResolver = DepsearchResolver = __decorate([
    (0, graphql_1.Resolver)(() => deputes_model_1.Deputes),
    __metadata("design:paramtypes", [depsearch_service_1.DepsearchService])
], DepsearchResolver);
//# sourceMappingURL=depsearch.resolver.js.map