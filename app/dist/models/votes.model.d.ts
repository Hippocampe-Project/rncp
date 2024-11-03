import { Model } from "sequelize-typescript";
import { Deputes } from "./deputes.model";
import { Scrutins } from "./scrutins.model";
import { InferAttributes, InferCreationAttributes } from "sequelize";
export declare class Votes extends Model<InferAttributes<Votes>, InferCreationAttributes<Votes>> {
    id: number;
    depute_id: number;
    scrutin_id: number;
    vote_state: string;
    depute: Deputes;
    scrutin: Scrutins;
}
