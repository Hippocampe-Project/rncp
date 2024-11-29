import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Votes } from "../models/votes.model";
// import { CreateVoteDto } from "../dto/create-vote.dto";

@Injectable()
export class VoteRepository {
  constructor(
    @InjectModel(Votes)
    private readonly voteModel: typeof Votes,
  ) {}

  // async create(createVoteDto: CreateVoteDto): Promise<Votes> {
  //   return await this.voteModel.create(createVoteDto);
  // }

  async findAll(): Promise<Votes[]> {
    return await this.voteModel.findAll();
  }

  async findOne(id: number): Promise<Votes> {
    const vote = await this.voteModel.findOne({
      where: { id },
    });
    if (!vote) {
      throw new NotFoundException(`Parti with ID ${id} not found`);
    }
    return vote;
  }

  async update(id: number, updateVoteDto: any): Promise<[number, Votes[]]> {
    return await this.voteModel.update(updateVoteDto, {
      where: {
        id,
      },
      returning: true,
    });
  }

  async delete(id: number): Promise<void> {
    const vote = await this.findOne(id);
    await vote.destroy();
  }
}
