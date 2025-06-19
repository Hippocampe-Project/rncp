import { Departements } from "models/departements.model";
export type Departement = {
    id: number;
    nom: string;
};
export declare function toEntity(model: Departements): Departement;
export declare function toModel(entity: Departement): Departements;
