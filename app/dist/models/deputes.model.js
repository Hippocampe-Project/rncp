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
const graphql_1 = require("@nestjs/graphql");
const votes_deputes_model_1 = require("./votes-deputes.model");
let Deputes = class Deputes extends sequelize_typescript_1.Model {
};
exports.Deputes = Deputes;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    (0, sequelize_typescript_1.ForeignKey)(() => votes_deputes_model_1.Votes_deputes),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], Deputes.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Deputes.prototype, "nom", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Deputes.prototype, "date_naissance", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Deputes.prototype, "sexe", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], Deputes.prototype, "departement_id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Deputes.prototype, "circonscription", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], Deputes.prototype, "commission_permanente_id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Deputes.prototype, "profession", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Deputes.prototype, "suppleant", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], Deputes.prototype, "parti_id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Deputes.prototype, "photo", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.BOOLEAN, defaultValue: true }),
    (0, graphql_1.Field)(),
    __metadata("design:type", Boolean)
], Deputes.prototype, "activite", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.DATE),
    (0, graphql_1.Field)(() => graphql_1.GraphQLISODateTime),
    __metadata("design:type", Date)
], Deputes.prototype, "activite_timestamp", void 0);
exports.Deputes = Deputes = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, sequelize_typescript_1.Table)({
        tableName: "deputes",
        timestamps: false,
    })
], Deputes);
//# sourceMappingURL=deputes.model.js.map