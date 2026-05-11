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
exports.EnderecoRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const endereco_entity_1 = require("./endereco.entity");
const typeorm_2 = require("@nestjs/typeorm");
let EnderecoRepository = class EnderecoRepository {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async save(endereco) {
        return this.repository.save(endereco);
    }
    async find(id) {
        return this.repository.findOne({
            where: {
                id: id
            }
        });
    }
};
exports.EnderecoRepository = EnderecoRepository;
exports.EnderecoRepository = EnderecoRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(endereco_entity_1.EnderecoEntity)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], EnderecoRepository);
//# sourceMappingURL=endereco.repository.js.map