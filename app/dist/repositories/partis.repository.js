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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PartiRepository = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const partis_model_1 = require("../models/partis.model");
let PartiRepository = class PartiRepository {
    constructor(partiModel) {
        this.partiModel = partiModel;
    }
    async findAll() {
        return await this.partiModel.findAll();
    }
    async findOne(id) {
        const parti = await this.partiModel.findOne({
            where: { id },
        });
        if (!parti) {
            throw new common_1.NotFoundException(`Parti with ID ${id} not found`);
        }
        return parti;
    }
    async update(id, updatePartiDto) {
        return await this.partiModel.update(updatePartiDto, {
            where: {
                id,
            },
            returning: true,
        });
    }
    async delete(id) {
        const parti = await this.findOne(id);
        await parti.destroy();
    }
};
exports.PartiRepository = PartiRepository;
exports.PartiRepository = PartiRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(partis_model_1.Partis)),
    __metadata("design:paramtypes", [Object])
], PartiRepository);
//# sourceMappingURL=partis.repository.js.map