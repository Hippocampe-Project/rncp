import { Votes } from "../models/votes.model";
import { CreateVoteDto } from "../dto/create-vote.dto";
export declare class VoteRepository {
    private readonly voteModel;
    constructor(voteModel: typeof Votes);
    create(createVoteDto: CreateVoteDto): Promise<Votes>;
    findAll(): Promise<Votes[]>;
    findOne(id: number): Promise<Votes>;
    update(id: number, updateVoteDto: any): Promise<[number, Votes[]]>;
    delete(id: number): Promise<void>;
}
