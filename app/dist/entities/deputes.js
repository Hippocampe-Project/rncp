"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toModel = exports.toEntity = void 0;
function toEntity(model) {
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
exports.toEntity = toEntity;
function toModel(entity) {
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
exports.toModel = toModel;
//# sourceMappingURL=deputes.js.map