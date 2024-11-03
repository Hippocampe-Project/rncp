import { Model } from "sequelize-typescript";
import { InferAttributes, InferCreationAttributes } from "sequelize";
export declare class CommissionsPermanentes extends Model<InferAttributes<CommissionsPermanentes>, InferCreationAttributes<CommissionsPermanentes>> {
    id: number;
    nom: string;
    objet: string;
}
