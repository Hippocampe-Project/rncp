import { Model } from "sequelize-typescript";
import { InferAttributes, InferCreationAttributes } from "sequelize";
export declare class Votes extends Model<InferAttributes<Votes>, InferCreationAttributes<Votes>> {
    id: number;
    titre: string;
    dossier_legislatif?: string;
    numero_vote: string;
    date: string;
    num_votants: number;
    num_pour: number;
    num_contre: number;
    num_abstention: number;
    non_votants: string[];
    num_non_votants: number;
    adopte?: boolean;
    num_absents: number;
    votants_pour: string[];
    votants_contre: string[];
    votants_abstention: string[];
}
