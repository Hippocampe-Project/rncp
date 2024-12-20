import { Model } from "sequelize-typescript";
export declare class Partis extends Model<Partis> {
    id: number;
    nom: string;
    president?: string;
    title: string;
}
