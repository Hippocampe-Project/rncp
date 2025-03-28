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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepsearchService = void 0;
const common_1 = require("@nestjs/common");
const votes_deputes_repository_1 = require("repositories/votes-deputes.repository");
let DepsearchService = class DepsearchService {
    constructor(votesDeputesRepository) {
        this.votesDeputesRepository = votesDeputesRepository;
    }
    async retrievePayload(deputeId) {
        const votes = await this.votesDeputesRepository.findAllDeputeVotes(deputeId);
        if (!votes.length) {
            throw new common_1.NotFoundException(`No votes found for depute with ID ${deputeId}`);
        }
        return votes;
    }
};
exports.DepsearchService = DepsearchService;
exports.DepsearchService = DepsearchService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof votes_deputes_repository_1.VotesDeputesRepository !== "undefined" && votes_deputes_repository_1.VotesDeputesRepository) === "function" ? _a : Object])
], DepsearchService);
//# sourceMappingURL=depsearch.service.js.map