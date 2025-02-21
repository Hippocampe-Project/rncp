import { Model } from "sequelize-typescript";
import { Votes } from "./votes.model";
export declare class Deputes extends Model {
    id: number;
    nom: string;
    date_naissance: string;
    sexe: string;
    departement_id: number;
    circonscription: string;
    commission_permanente_id?: number;
    profession: string;
    suppleant?: string;
    parti_id: number;
    votes: Votes[];
    photo?: string;
    activite: boolean;
}
