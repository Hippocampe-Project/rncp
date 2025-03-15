import { Votes } from "../models/votes.model";
export declare class VoteRepository {
    private readonly voteModel;
    constructor(voteModel: typeof Votes);
    findVotesByDeputeName(deputeName: string): Promise<Votes[] | null>;
}
