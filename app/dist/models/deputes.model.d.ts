import { Model } from "sequelize-typescript";
import { InferAttributes, InferCreationAttributes } from "sequelize";
export declare class Deputes extends Model<InferAttributes<Deputes>, InferCreationAttributes<Deputes>> {
    id: number;
    nom: string;
    date_naissance: string;
    sexe: string;
    departement_name: string;
    circonscription: string;
    commission_permanente_name?: string;
    profession: string;
    suppleant?: string;
    parti_name: string;
    photo?: string;
}
