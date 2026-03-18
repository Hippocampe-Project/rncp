import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Votes_deputes } from "../models/votes-deputes.model";

@Injectable()
export class VotesDeputesRepository {
  constructor(
    @InjectModel(Votes_deputes)
    private readonly votesDeputeModel: typeof Votes_deputes,
  ) {}

  async findAllDeputeVotes(deputeId: number): Promise<Votes_deputes[]> {
    try {
      return await this.votesDeputeModel.findAll({
        where: {
          depute_id: deputeId,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException("Database error", {
        cause: error,
      });
    }
  }
}
