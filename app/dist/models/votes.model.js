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
exports.Votes = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const votes_deputes_model_1 = require("./votes-deputes.model");
const graphql_1 = require("@nestjs/graphql");
let Votes = class Votes extends sequelize_typescript_1.Model {
};
exports.Votes = Votes;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    (0, sequelize_typescript_1.ForeignKey)(() => votes_deputes_model_1.Votes_deputes),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], Votes.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Votes.prototype, "titre", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Votes.prototype, "dossier_legislatif", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Votes.prototype, "numero_vote", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Votes.prototype, "date", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], Votes.prototype, "num_votants", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], Votes.prototype, "num_pour", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], Votes.prototype, "num_contre", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], Votes.prototype, "num_abstention", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.ARRAY(sequelize_typescript_1.DataType.STRING)),
    (0, graphql_1.Field)(() => [String]),
    __metadata("design:type", Array)
], Votes.prototype, "non_votants", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Votes.prototype, "num_non_votants", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.BOOLEAN),
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Boolean)
], Votes.prototype, "adopte", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], Votes.prototype, "num_absents", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.ARRAY(sequelize_typescript_1.DataType.STRING)),
    (0, graphql_1.Field)(() => [String]),
    __metadata("design:type", Array)
], Votes.prototype, "votants_pour", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.ARRAY(sequelize_typescript_1.DataType.STRING)),
    (0, graphql_1.Field)(() => [String]),
    __metadata("design:type", Array)
], Votes.prototype, "votants_contre", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.ARRAY(sequelize_typescript_1.DataType.STRING)),
    (0, graphql_1.Field)(() => [String]),
    __metadata("design:type", Array)
], Votes.prototype, "votants_abstention", void 0);
exports.Votes = Votes = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, sequelize_typescript_1.Table)({
        tableName: "votes",
        timestamps: false,
    })
], Votes);
//# sourceMappingURL=votes.model.js.map