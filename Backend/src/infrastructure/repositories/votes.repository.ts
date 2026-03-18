import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Votes } from "../models/votes.model";
import { Op } from "sequelize";

@Injectable()
export class VoteRepository {
  constructor(
    @InjectModel(Votes)
    private readonly voteModel: typeof Votes,
  ) {}

  async findVotesByDeputeName(deputeName: string): Promise<Votes[]> {
    try {
      return this.voteModel.findAll({
        where: {
          [Op.or]: [
            { votants_pour: { [Op.contains]: [deputeName] } },
            { votants_contre: { [Op.contains]: [deputeName] } },
            { votants_abstention: { [Op.contains]: [deputeName] } },
            { non_votants: { [Op.contains]: [deputeName] } },
          ],
        },
      });
    } catch (error) {
      throw new InternalServerErrorException("Database error", {
        cause: error,
      });
    }
  }
}
