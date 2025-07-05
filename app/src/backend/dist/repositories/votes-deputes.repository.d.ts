import { Votes_deputes } from "models/votes-deputes.model";
export declare class VotesDeputesRepository {
    private readonly votesDeputeModel;
    constructor(votesDeputeModel: typeof Votes_deputes);
    findAllDeputeVotes(deputeId: number): Promise<Votes_deputes[] | null>;
}
