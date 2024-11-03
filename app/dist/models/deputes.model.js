"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Deputes = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const partis_model_1 = require("./partis.model");
const departements_model_1 = require("./departements.model");
const commissions_p_model_1 = require("./commissions-p.model");
let Deputes = class Deputes extends sequelize_typescript_1.Model {
};
exports.Deputes = Deputes;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Deputes.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], Deputes.prototype, "nom", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", Date)
], Deputes.prototype, "dateNaissance", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => departements_model_1.Departements),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Deputes.prototype, "departement_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => departements_model_1.Departements),
    __metadata("design:type", departements_model_1.Departements)
], Deputes.prototype, "departement", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", Number)
], Deputes.prototype, "circonscription", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => departements_model_1.Departements),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Deputes.prototype, "commissionPermanente_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => commissions_p_model_1.CommissionsPermanentes),
    __metadata("design:type", commissions_p_model_1.CommissionsPermanentes)
], Deputes.prototype, "commissionPermanente", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], Deputes.prototype, "profession", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], Deputes.prototype, "suppleant", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => partis_model_1.Partis),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Deputes.prototype, "parti_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => partis_model_1.Partis),
    __metadata("design:type", partis_model_1.Partis)
], Deputes.prototype, "parti", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.BLOB),
    __metadata("design:type", Blob)
], Deputes.prototype, "photo", void 0);
exports.Deputes = Deputes = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "deputes",
        timestamps: false,
    })
], Deputes);
//# sourceMappingURL=deputes.model.js.map