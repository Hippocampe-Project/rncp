import { Injectable, NotFoundException } from "@nestjs/common";
import { VotesDeputesRepository } from "../../infrastructure/repositories/votes-deputes.repository";
import { Depsearch } from "../../presentation/resolvers/depsearch.resolver";

@Injectable()
export class DepsearchService {
  constructor(private votesDeputesRepository: VotesDeputesRepository) {}

  async retrievePayload(deputeId: number): Promise<Depsearch[]> {
    const votes =
      await this.votesDeputesRepository.findAllDeputeVotes(deputeId);
    if (!votes.length) {
      throw new NotFoundException(
        `No votes found for depute with ID ${deputeId}`
      );
    }
    return votes;
  }
}
