import { Votes } from "../../infrastructure/models/votes.model";

export interface IVoteRepository {
  findVotesByDeputeName(deputeName: string): Promise<Votes[]>;
}
