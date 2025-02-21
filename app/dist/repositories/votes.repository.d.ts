import { Votes } from "../models/votes.model";
import { InferAttributes } from "sequelize";
export declare class VoteRepository {
    private readonly voteModel;
    constructor(voteModel: typeof Votes);
    deputeVotes(deputeName: string): Promise<InferAttributes<Votes>[]>;
}
