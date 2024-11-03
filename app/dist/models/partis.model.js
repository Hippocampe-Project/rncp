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
exports.Partis = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const deputes_model_1 = require("./deputes.model");
let Partis = class Partis extends sequelize_typescript_1.Model {
};
exports.Partis = Partis;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Partis.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], Partis.prototype, "nom", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => deputes_model_1.Deputes),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: true,
    }),
    __metadata("design:type", Number)
], Partis.prototype, "presidentId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => deputes_model_1.Deputes, "presidentId"),
    __metadata("design:type", deputes_model_1.Deputes)
], Partis.prototype, "president", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => deputes_model_1.Deputes),
    __metadata("design:type", Array)
], Partis.prototype, "deputes", void 0);
exports.Partis = Partis = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "partis",
        timestamps: false,
    })
], Partis);
//# sourceMappingURL=partis.model.js.map