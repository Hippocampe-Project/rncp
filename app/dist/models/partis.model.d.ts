import { Model } from 'sequelize-typescript';
import { Deputes } from './deputes.model';
export declare class Partis extends Model<Partis> {
    id: number;
    nom: string;
    deputes: Deputes[];
}
