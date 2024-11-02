import { Model } from 'sequelize-typescript';
import { Partis } from './partis.model';
export declare class Deputes extends Model<Deputes> {
    id: number;
    nom: string;
    parti_id: number;
    parti: Partis;
}
