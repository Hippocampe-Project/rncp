import {
  Injectable,
  Inject,
  NotFoundException,
  InternalServerErrorException,
} from "@nestjs/common";
import { Deputes } from "../models/deputes.model";
import { InjectModel } from "@nestjs/sequelize";
import { InferAttributes, Op } from "sequelize";

@Injectable()
export class DeputeRepository {
  constructor(
    //The injection of the model allows for interaction with the database via sequelize in plain typescript
    @InjectModel(Deputes)
    private readonly deputeModel: typeof Deputes,
  ) {}

  //Use InferAttributes & InferCreationAttributes here to infer the data type being interacted with or created:

  async findDeputeByName(
    deputeName: string,
  ): Promise<InferAttributes<Deputes> | null> {
    try {
      return this.deputeModel.findOne({
        where: {
          nom: { [Op.iLike]: deputeName },
        },
      });
    } catch (error) {
      throw new InternalServerErrorException("Database error", {
        cause: error,
      });
    }
  }
}
