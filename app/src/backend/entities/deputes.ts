import { Deputes } from "../models/deputes.model";

export type Depute = {
    id: number,
    nom: string,
    dateNaissance: string,
    sexe: string,
    departementName: string,
    circonscription: string,
    profession: string,
    partiName: string,
    commissionPermanenteName?: string,
    suppleant?: string,
    photo?: string
}

export function toEntity(model: Deputes): Depute {
  return {
      id: model.id,
      nom: model.nom,
      dateNaissance: model.date_naissance,
      sexe: model.sexe,
      departementName: model.departement_name,
      circonscription: model.circonscription,
      profession: model.profession,
      partiName: model.parti_name,
      commissionPermanenteName: model.commission_permanente_name,
      suppleant: model.suppleant,
      photo: model.photo
  };
}

export function toModel(entity: Depute): Partial<Deputes> {
    return {
      id: entity.id,
      nom: entity.nom,
      date_naissance: entity.dateNaissance,
      sexe: entity.sexe,
      departement_name: entity.departementName,
      circonscription: entity.circonscription,
      profession: entity.profession,
      parti_name: entity.partiName,
      commission_permanente_name: entity.commissionPermanenteName,
      suppleant: entity.suppleant,
      photo: entity.photo,
    };
  }
