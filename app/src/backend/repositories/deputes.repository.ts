import { Injectable, Inject, NotFoundException } from "@nestjs/common";
import { Deputes } from "../models/deputes.model";
import { InjectModel } from "@nestjs/sequelize";
// import { CreateDeputeDto } from "../dto/create-depute.dto";

@Injectable()
export class DeputeRepository {
  constructor(
    @InjectModel(Deputes)
    private readonly deputeModel: typeof Deputes,
  ) {}

  // async create(createDeputeDto: CreateDeputeDto): Promise<Deputes> {
  //   return await this.deputeModel.create(createDeputeDto);
  // }

  async findAll(): Promise<Deputes[]> {
    return await this.deputeModel.findAll();
  }

  async findOne(id: number): Promise<Deputes> {
    const depute = await this.deputeModel.findOne({
      where: { id },
    });
    if (!depute) {
      throw new NotFoundException(`Depute with ID ${id} not found`);
    }
    return depute;
  }

  async update(id: number, updateDeputeDto: any): Promise<[number, Deputes[]]> {
    return await this.deputeModel.update(updateDeputeDto, {
      where: {
        id,
      },
      returning: true,
    });
  }

  async delete(id: number): Promise<void> {
    const depute = await this.findOne(id);
    await depute.destroy();
  }
}
