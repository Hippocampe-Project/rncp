import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Votes } from "../../infrastructure/models/votes.model";
import { Votes_deputes } from "../../infrastructure/models/votes-deputes.model";
import { DeputeRepository } from "../../infrastructure/repositories/deputes.repository";
import { VoteRepository } from "../../infrastructure/repositories/votes.repository";
import { DeputeNotFoundError, VotesNotFoundError } from "./depsearch.errors";
import { IVotesDeputesService } from "../ports/votes-deputes.port";

@Injectable()
export class VotesDeputesService implements IVotesDeputesService {
  constructor(
    @InjectModel(Votes_deputes) private votesDeputesModel: typeof Votes_deputes,
    private deputeRepository: DeputeRepository,
    private voteRepository: VoteRepository,
  ) {}

  async createPayload(deputeName: string): Promise<number> {
    const depute = await this.deputeRepository.findDeputeByName(deputeName);
    if (!depute) {
      throw new DeputeNotFoundError(deputeName);
    }
    const deputesVotes: Votes[] =
      await this.voteRepository.findVotesByDeputeName(deputeName); // /!\ TODO:  can not return cases where deputy is absent 
    if (deputesVotes.length === 0) {
      throw new VotesNotFoundError(deputeName);
    }

    const payload = deputesVotes.map((vote) => ({
      vote_id: vote.id,
      depute_id: depute.id,
      vote_category: this.getVoteCategory(deputeName, vote),
      depute_nom: this.normalizeName(deputeName),
      vote_titre: vote.titre,
    }));

    await this.votesDeputesModel.bulkCreate(payload, {
      updateOnDuplicate: ["vote_category", "vote_titre", "depute_nom"],
    });
    return depute.id;
  }

  private normalizeName(name: string): string {
    return name
      .normalize("NFD") // Decomposes accented characters
      .replace(/[\u0300-\u036f]/g, "") // Removes accents
      .replace(/[-\s]/g, "") // Removes spaces and hyphens
      .toLowerCase(); // Makes it lowercase
  }

  private getVoteCategory(deputeName: string, vote: any): string {
    //"vote" should be of type Vote from the vote entity
    if (vote.votants_pour.includes(deputeName)) return "pour";
    if (vote.votants_contre.includes(deputeName)) return "contre";
    if (vote.votants_abstention.includes(deputeName)) return "abstention";
    if (vote.non_votants.includes(deputeName)) return "non_votant";
    return "absent";
  }
}
