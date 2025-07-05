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
exports.Votes_deputes = void 0;
const graphql_1 = require("@nestjs/graphql");
const sequelize_typescript_1 = require("sequelize-typescript");
const votes_model_1 = require("./votes.model");
const deputes_model_1 = require("./deputes.model");
let Votes_deputes = class Votes_deputes extends sequelize_typescript_1.Model {
};
exports.Votes_deputes = Votes_deputes;
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => votes_model_1.Votes),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], Votes_deputes.prototype, "vote_id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => deputes_model_1.Deputes),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], Votes_deputes.prototype, "depute_id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Votes_deputes.prototype, "vote_category", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Votes_deputes.prototype, "depute_nom", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Votes_deputes.prototype, "vote_titre", void 0);
exports.Votes_deputes = Votes_deputes = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, sequelize_typescript_1.Table)({
        tableName: "votes_deputes",
        timestamps: false,
    })
], Votes_deputes);
//# sourceMappingURL=votes-deputes.model.js.map