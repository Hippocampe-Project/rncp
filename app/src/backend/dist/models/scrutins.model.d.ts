import { Model } from "sequelize-typescript";
import { InferAttributes, InferCreationAttributes } from "sequelize";
export declare class Scrutins extends Model<InferAttributes<Scrutins>, InferCreationAttributes<Scrutins>> {
    id: number;
    titre: string;
    dossier_legislatif?: string;
    date: string;
    nom: string;
}
