"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toModel = exports.toEntity = void 0;
function toEntity(model) {
    return {
        id: model.id,
        nom: model.nom,
    };
}
exports.toEntity = toEntity;
function toModel(entity) {
    return {
        id: entity.id,
        nom: entity.nom,
    };
}
exports.toModel = toModel;
//# sourceMappingURL=departements.js.map