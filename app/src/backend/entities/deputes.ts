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

export function toEntity(model: Deputes): Depute {
  return {
    id: model.id,
    nom: model.nom,
    dateNaissance: model.date_naissance,
    sexe: model.sexe,
    departementId: model.departement_id,
    circonscription: model.circonscription,
    profession: model.profession,
    partiId: model.parti_id,
    commissionPermanenteId: model.commission_permanente_id,
    suppleant: model.suppleant,
    photo: model.photo,
  };
}

export function toModel(entity: Depute): Partial<Deputes> {
  return {
    id: entity.id,
    nom: entity.nom,
    date_naissance: entity.dateNaissance,
    sexe: entity.sexe,
    departement_id: entity.departementId,
    circonscription: entity.circonscription,
    profession: entity.profession,
    parti_id: entity.partiId,
    commission_permanente_id: entity.commissionPermanenteId,
    suppleant: entity.suppleant,
    photo: entity.photo,
  };
}
