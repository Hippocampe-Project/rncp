import { Model } from "sequelize-typescript";
import { InferAttributes, InferCreationAttributes } from "sequelize";
export declare class Departements extends Model<InferAttributes<Departements>, InferCreationAttributes<Departements>> {
    id: number;
    nom: string;
}
