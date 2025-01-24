import { Deputes } from "../models/deputes.model";
export type Depute = {
    id: number;
    nom: string;
    dateNaissance: string;
    sexe: string;
    departementName: string;
    circonscription: string;
    profession: string;
    partiName: string;
    commissionPermanenteName?: string;
    suppleant?: string;
    photo?: string;
};
export declare function toEntity(model: Deputes): Depute;
export declare function toModel(entity: Depute): Partial<Deputes>;
