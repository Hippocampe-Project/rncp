import { Model } from "sequelize-typescript";
export declare class CommissionsPermanentes extends Model {
    id: number;
    nom: string;
    objet: string;
    deputes?: string[];
    logo?: string;
}
