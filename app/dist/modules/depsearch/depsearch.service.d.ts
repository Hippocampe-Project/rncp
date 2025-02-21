import { DeputeRepository } from "repositories/deputes.repository";
import { VoteRepository } from "repositories/votes.repository";
export declare class DepsearchService {
    private deputeRepository;
    private voteRepository;
    constructor(deputeRepository: DeputeRepository, voteRepository: VoteRepository);
    getDeputeByName(deputeName: string): Promise<{
        depute: any;
        votes: any;
    }>;
}
