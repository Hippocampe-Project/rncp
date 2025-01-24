import { Injectable } from "@nestjs/common";
import { Deputes } from "../../models/deputes.model";
import { InjectModel } from "@nestjs/sequelize";
import { InferAttributes, InferCreationAttributes } from "sequelize";
import { Depute } from "src/backend/entities/deputes";

@Injectable()
export class DepsearchService {
  //Describes the behavior of the class when instanciated
  constructor(
    //The injection of the model allows for interaction with the database via sequelize in plain typescript
    @InjectModel(Deputes)
     //declares a property only accessible in this service (private) referring to the Model rather than a potential instance of it,
    //ensuring that should an invalid method be called upon the property, it will get caught compiling and not at runtime.
    private deputeModel: typeof Deputes,
  ) {}

  //Use InferAttributes & InferCreationAttributes here to infer the data type being interacted with or created:

  // Example:
  async findDepute(deputeName: number): Promise<InferAttributes<Deputes> | null> {
    return this.deputeModel.findOne({ where: { nom: deputeName } });
  }

}
