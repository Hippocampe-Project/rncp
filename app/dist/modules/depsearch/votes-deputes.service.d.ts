import { Votes_deputes } from "models/votes-deputes.model";
import { DeputeRepository } from "repositories/deputes.repository";
import { VoteRepository } from "repositories/votes.repository";
export declare class VotesDeputesService {
    private votesDeputesModel;
    private deputeRepository;
    private voteRepository;
    constructor(votesDeputesModel: typeof Votes_deputes, deputeRepository: DeputeRepository, voteRepository: VoteRepository);
    createPayload(deputeName: string): Promise<number>;
    private normalizeName;
    private getVoteCategory;
}
