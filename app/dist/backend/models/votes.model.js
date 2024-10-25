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
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vote = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const depute_model_1 = require("./depute.model");
const scrutin_model_1 = require("./scrutin.model");
let Vote = class Vote extends sequelize_typescript_1.Model {
};
exports.Vote = Vote;
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Vote.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => depute_model_1.Depute),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Vote.prototype, "depute_id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => scrutin_model_1.Scrutin),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Vote.prototype, "scrutin_id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], Vote.prototype, "vote_state", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => depute_model_1.Depute),
    __metadata("design:type", typeof (_a = typeof depute_model_1.Depute !== "undefined" && depute_model_1.Depute) === "function" ? _a : Object)
], Vote.prototype, "depute", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => scrutin_model_1.Scrutin),
    __metadata("design:type", typeof (_b = typeof scrutin_model_1.Scrutin !== "undefined" && scrutin_model_1.Scrutin) === "function" ? _b : Object)
], Vote.prototype, "scrutin", void 0);
exports.Vote = Vote = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'votes',
        timestamps: true,
    })
], Vote);
//# sourceMappingURL=votes.model.js.map