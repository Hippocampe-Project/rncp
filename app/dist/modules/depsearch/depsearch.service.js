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
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepsearchService = void 0;
const common_1 = require("@nestjs/common");
const deputes_repository_1 = require("repositories/deputes.repository");
const votes_repository_1 = require("repositories/votes.repository");
const depsearch_errors_1 = require("./depsearch.errors");
let DepsearchService = class DepsearchService {
    constructor(deputeRepository, voteRepository) {
        this.deputeRepository = deputeRepository;
        this.voteRepository = voteRepository;
    }
    async getDeputeByName(deputeName) {
        const depute = await this.deputeRepository.findDepute(deputeName);
        if (!depute) {
            throw new depsearch_errors_1.DeputeNotFoundError(deputeName);
        }
        const votes = await this.voteRepository.deputeVotes(deputeName);
        return { depute, votes };
    }
};
exports.DepsearchService = DepsearchService;
exports.DepsearchService = DepsearchService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof deputes_repository_1.DeputeRepository !== "undefined" && deputes_repository_1.DeputeRepository) === "function" ? _a : Object, typeof (_b = typeof votes_repository_1.VoteRepository !== "undefined" && votes_repository_1.VoteRepository) === "function" ? _b : Object])
], DepsearchService);
//# sourceMappingURL=depsearch.service.js.map