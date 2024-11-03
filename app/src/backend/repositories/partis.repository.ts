import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Partis } from "../models/partis.model";
import { CreatePartiDto } from "../dto/create-parti.dto";

@Injectable()
export class PartiRepository {
  constructor(
    @InjectModel(Partis)
    private readonly partiModel: typeof Partis,
  ) {}

  async create(createPartiDto: CreatePartiDto): Promise<Partis> {
    return await this.partiModel.create(createPartiDto);
  }

  async findAll(): Promise<Partis[]> {
    return await this.partiModel.findAll();
  }

  async findOne(id: number): Promise<Partis> {
    return await this.partiModel.findOne({
      where: {
        id,
      },
    });
  }

  async update(id: number, updatePartiDto: any): Promise<[number, Partis[]]> {
    return await this.partiModel.update(updatePartiDto, {
      where: {
        id,
      },
      returning: true,
    });
  }

  async delete(id: number): Promise<void> {
    const parti = await this.findOne(id);
    await parti.destroy();
  }
}
