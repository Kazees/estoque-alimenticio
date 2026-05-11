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
var EnderecoEntity_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnderecoEntity = void 0;
const typeorm_1 = require("typeorm");
const bairro_entity_1 = require("./bairro/bairro.entity");
let EnderecoEntity = EnderecoEntity_1 = class EnderecoEntity {
    id;
    logradouro;
    numero;
    complemento;
    cep;
    bairroId;
    bairro;
    static of(input) {
        const endereco = new EnderecoEntity_1();
        endereco.logradouro = input.logradouro;
        endereco.numero = input.numero;
        endereco.complemento = input.complemento;
        endereco.cep = input.cep;
        endereco.bairroId = input.bairroId;
        return endereco;
    }
    update(input) {
        if (input.logradouro)
            this.logradouro = input.logradouro;
        if (input.numero)
            this.numero = input.numero;
        if (input.complemento)
            this.complemento = input.complemento;
        if (input.cep)
            this.cep = input.cep;
        if (input.bairroId)
            this.bairroId = input.bairroId;
    }
};
exports.EnderecoEntity = EnderecoEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], EnderecoEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'logradouro', nullable: false }),
    __metadata("design:type", String)
], EnderecoEntity.prototype, "logradouro", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'numero', nullable: false }),
    __metadata("design:type", Number)
], EnderecoEntity.prototype, "numero", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'complemento', nullable: true }),
    __metadata("design:type", String)
], EnderecoEntity.prototype, "complemento", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'cep', nullable: false }),
    __metadata("design:type", String)
], EnderecoEntity.prototype, "cep", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'bairroId', nullable: false }),
    __metadata("design:type", Number)
], EnderecoEntity.prototype, "bairroId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => bairro_entity_1.BairroEntity, (bairro) => bairro.id),
    (0, typeorm_1.JoinColumn)({ name: 'bairroId', referencedColumnName: 'id' }),
    __metadata("design:type", bairro_entity_1.BairroEntity)
], EnderecoEntity.prototype, "bairro", void 0);
exports.EnderecoEntity = EnderecoEntity = EnderecoEntity_1 = __decorate([
    (0, typeorm_1.Entity)({ name: 'Endereco' })
], EnderecoEntity);
//# sourceMappingURL=endereco.entity.js.map