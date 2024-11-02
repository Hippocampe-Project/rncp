import { Model } from 'sequelize-typescript';
import { Deputes } from './deputes.model';
export declare class Votes extends Model<Votes> {
    id: number;
    depute_id: number;
    vote_state: string;
    depute: Deputes;
}
