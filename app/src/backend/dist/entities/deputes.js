"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toEntity = toEntity;
exports.toModel = toModel;
function toEntity(model) {
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
function toModel(entity) {
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
//# sourceMappingURL=deputes.js.map