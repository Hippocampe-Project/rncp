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
exports.VotesDeputesService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const votes_deputes_model_1 = require("../../models/votes-deputes.model");
const deputes_repository_1 = require("../../repositories/deputes.repository");
const votes_repository_1 = require("../../repositories/votes.repository");
const depsearch_errors_1 = require("./depsearch.errors");
let VotesDeputesService = class VotesDeputesService {
    constructor(votesDeputesModel, deputeRepository, voteRepository) {
        this.votesDeputesModel = votesDeputesModel;
        this.deputeRepository = deputeRepository;
        this.voteRepository = voteRepository;
    }
    async createPayload(deputeName) {
        const depute = await this.deputeRepository.findDeputeByName(deputeName);
        if (!depute) {
            throw new depsearch_errors_1.DeputeNotFoundError(deputeName);
        }
        const deputesVotes = await this.voteRepository.findVotesByDeputeName(deputeName);
        if (deputesVotes.length === 0) {
            throw new depsearch_errors_1.VotesNotFoundError(deputeName);
        }
        const payload = deputesVotes.map((vote) => ({
            vote_id: vote.id,
            depute_id: depute.id,
            vote_category: this.getVoteCategory(deputeName, vote),
            depute_nom: this.normalizeName(deputeName),
            vote_titre: vote.titre,
        }));
        this.votesDeputesModel.bulkCreate(payload);
        return depute.id;
    }
    normalizeName(name) {
        return name
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[-\s]/g, "")
            .toLowerCase();
    }
    getVoteCategory(deputeName, vote) {
        if (vote.votants_pour.includes(deputeName))
            return "pour";
        if (vote.votants_contre.includes(deputeName))
            return "contre";
        if (vote.votants_abstention.includes(deputeName))
            return "abstention";
        if (vote.non_votants.includes(deputeName))
            return "non_votant";
        return "absent";
    }
};
exports.VotesDeputesService = VotesDeputesService;
exports.VotesDeputesService = VotesDeputesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(votes_deputes_model_1.Votes_deputes)),
    __metadata("design:paramtypes", [Object, deputes_repository_1.DeputeRepository,
        votes_repository_1.VoteRepository])
], VotesDeputesService);
//# sourceMappingURL=votes-deputes.service.js.map