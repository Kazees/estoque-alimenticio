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
exports.MunicipioEntity = void 0;
const typeorm_1 = require("typeorm");
const estado_entity_1 = require("../estado/estado.entity");
let MunicipioEntity = class MunicipioEntity {
    id;
    codigo;
    name;
    estadoId;
    estado;
};
exports.MunicipioEntity = MunicipioEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], MunicipioEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'codigo', nullable: false }),
    __metadata("design:type", String)
], MunicipioEntity.prototype, "codigo", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'name', nullable: false }),
    __metadata("design:type", String)
], MunicipioEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'estadoId', nullable: false }),
    __metadata("design:type", Number)
], MunicipioEntity.prototype, "estadoId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => estado_entity_1.EstadoEntity, (estado) => estado.id),
    (0, typeorm_1.JoinColumn)({ name: 'estadoId', referencedColumnName: 'id' }),
    __metadata("design:type", estado_entity_1.EstadoEntity)
], MunicipioEntity.prototype, "estado", void 0);
exports.MunicipioEntity = MunicipioEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'Municipio' })
], MunicipioEntity);
//# sourceMappingURL=municipio.entity.js.map