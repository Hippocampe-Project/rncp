import { Model } from 'sequelize-typescript';
import { Depute } from './depute.model';
import { Scrutin } from './scrutin.model';
export declare class Vote extends Model<Vote> {
    id: number;
    depute_id: number;
    scrutin_id: number;
    vote_state: string;
    depute: Depute;
    scrutin: Scrutin;
}
