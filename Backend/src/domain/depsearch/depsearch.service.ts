import { Injectable, NotFoundException } from "@nestjs/common";
import { DeputeRepository } from "repositories/deputes.repository"; // Import repository
import { VoteRepository } from "repositories/votes.repository";
import { DeputeNotFoundError } from "./depsearch.errors";
import { VotesDeputesRepository } from "repositories/votes-deputes.repository";
import { Votes_deputes } from "models/votes-deputes.model";
import { Deputes } from "models/deputes.model";
import { Depsearch } from "../../infrastructure/resolvers/depsearch.resolver";

@Injectable()
export class DepsearchService {
  constructor(private votesDeputesRepository: VotesDeputesRepository) {}

  async retrievePayload(deputeId: number): Promise<Depsearch[]> {
    const votes =
      await this.votesDeputesRepository.findAllDeputeVotes(deputeId);
    if (!votes.length) {
      throw new NotFoundException(
        `No votes found for depute with ID ${deputeId}`,
      );
    }
    //return name back to normal
    return votes;
  }
}
