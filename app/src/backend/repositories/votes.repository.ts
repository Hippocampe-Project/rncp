import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Votes } from "../models/votes.model";
import { Deputes } from "models/deputes.model";
import { InferAttributes, Op, WhereOptions } from "sequelize";

@Injectable()
export class VoteRepository {
  constructor(
    @InjectModel(Votes)
    private readonly voteModel: typeof Votes,
  ) {}

  async deputeVotes(deputeName: string): Promise<InferAttributes<Votes>[]> {
    const whereCondition: WhereOptions<Votes> = {
      [Op.or]: [
        { votants_pour: { [Op.overlap]: [deputeName] } },
        { votants_contre: { [Op.overlap]: [deputeName] } },
        { votants_abstention: { [Op.overlap]: [deputeName] } },
      ],
    };
    try {
      return this.voteModel.findAll({ where: whereCondition });
    } catch (error) {
      throw new InternalServerErrorException("Database error", error);
    }
  }
}
