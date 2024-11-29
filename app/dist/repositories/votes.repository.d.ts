import { Votes } from "../models/votes.model";
export declare class VoteRepository {
    private readonly voteModel;
    constructor(voteModel: typeof Votes);
    findAll(): Promise<Votes[]>;
    findOne(id: number): Promise<Votes>;
    update(id: number, updateVoteDto: any): Promise<[number, Votes[]]>;
    delete(id: number): Promise<void>;
}
