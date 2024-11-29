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
exports.CommissionsPermanentes = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const deputes_model_1 = require("./deputes.model");
let CommissionsPermanentes = class CommissionsPermanentes extends sequelize_typescript_1.Model {
};
exports.CommissionsPermanentes = CommissionsPermanentes;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], CommissionsPermanentes.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], CommissionsPermanentes.prototype, "nom", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], CommissionsPermanentes.prototype, "objet", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => deputes_model_1.Deputes),
    __metadata("design:type", Array)
], CommissionsPermanentes.prototype, "Deputesid", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", Array)
], CommissionsPermanentes.prototype, "deputes", void 0);
exports.CommissionsPermanentes = CommissionsPermanentes = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "commissions-p",
        timestamps: false,
    })
], CommissionsPermanentes);
//# sourceMappingURL=commissions-p.model.js.map