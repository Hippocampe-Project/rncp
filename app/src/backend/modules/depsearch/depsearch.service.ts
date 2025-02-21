import { Injectable, NotFoundException } from "@nestjs/common";
import { DeputeRepository } from "repositories/deputes.repository"; // Import repository
import { VoteRepository } from "repositories/votes.repository";
import { DeputeNotFoundError } from "./depsearch.errors";

@Injectable()
export class DepsearchService {
  constructor(
    private deputeRepository: DeputeRepository,
    private voteRepository: VoteRepository,
  ) {}

  async getDeputeByName(deputeName: string) {
    const depute = await this.deputeRepository.findDepute(deputeName);
    if (!depute) {
      throw new DeputeNotFoundError(deputeName);
    }

    const votes = await this.voteRepository.deputeVotes(deputeName);

    return { depute, votes };
  }
}
