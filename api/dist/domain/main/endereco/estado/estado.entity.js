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
exports.EstadoEntity = void 0;
const typeorm_1 = require("typeorm");
const regiao_entity_1 = require("../regiao/regiao.entity");
let EstadoEntity = class EstadoEntity {
    id;
    codigoUf;
    name;
    uf;
    regiaoId;
    regiao;
};
exports.EstadoEntity = EstadoEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], EstadoEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'codigoUf', nullable: false }),
    __metadata("design:type", Number)
], EstadoEntity.prototype, "codigoUf", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'name', nullable: false }),
    __metadata("design:type", String)
], EstadoEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'uf', nullable: false }),
    __metadata("design:type", String)
], EstadoEntity.prototype, "uf", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'regiaoId', nullable: false }),
    __metadata("design:type", Number)
], EstadoEntity.prototype, "regiaoId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => regiao_entity_1.RegiaoEntity, (regiao) => regiao.id),
    (0, typeorm_1.JoinColumn)({ name: 'regiaoId', referencedColumnName: 'id' }),
    __metadata("design:type", regiao_entity_1.RegiaoEntity)
], EstadoEntity.prototype, "regiao", void 0);
exports.EstadoEntity = EstadoEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'Estado' })
], EstadoEntity);
//# sourceMappingURL=estado.entity.js.map