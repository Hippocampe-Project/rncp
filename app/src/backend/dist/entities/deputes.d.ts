import { Deputes } from "../models/deputes.model";
export type Depute = {
    id: number;
    nom: string;
    dateNaissance: string;
    sexe: string;
    departementId: number;
    circonscription: string;
    profession: string;
    partiId: number;
    commissionPermanenteId?: number;
    suppleant?: string;
    photo?: string;
};
export declare function toEntity(model: Deputes): Depute;
export declare function toModel(entity: Depute): Partial<Deputes>;
