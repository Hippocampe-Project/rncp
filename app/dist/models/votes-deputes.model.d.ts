import { Model } from "sequelize-typescript";
import { InferAttributes, InferCreationAttributes } from "sequelize";
export declare class Votes_deputes extends Model<InferAttributes<Votes_deputes>, InferCreationAttributes<Votes_deputes>> {
    vote_id: number;
    depute_id: number;
    vote_category: string;
    depute_nom: string;
    vote_titre: string;
}
