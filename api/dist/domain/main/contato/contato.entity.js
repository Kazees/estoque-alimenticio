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
var ContatoEntity_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContatoEntity = void 0;
const typeorm_1 = require("typeorm");
let ContatoEntity = ContatoEntity_1 = class ContatoEntity {
    id;
    codigo_pais;
    ddd;
    numero;
    static of(input) {
        const contato = new ContatoEntity_1();
        contato.codigo_pais = input.codigo_pais;
        contato.ddd = input.ddd;
        contato.numero = input.numero;
        return contato;
    }
    update(input) {
        if (input.codigo_pais)
            this.codigo_pais = input.codigo_pais;
        if (input.ddd)
            this.ddd = input.ddd;
        if (input.numero)
            this.numero = input.numero;
    }
};
exports.ContatoEntity = ContatoEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], ContatoEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'codigo_pais', nullable: false }),
    __metadata("design:type", String)
], ContatoEntity.prototype, "codigo_pais", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'ddd', nullable: false }),
    __metadata("design:type", String)
], ContatoEntity.prototype, "ddd", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'numero', nullable: false, unique: true }),
    __metadata("design:type", String)
], ContatoEntity.prototype, "numero", void 0);
exports.ContatoEntity = ContatoEntity = ContatoEntity_1 = __decorate([
    (0, typeorm_1.Entity)({ name: 'Contato' }),
    (0, typeorm_1.Unique)(['codigo_pais', 'ddd', 'numero'])
], ContatoEntity);
//# sourceMappingURL=contato.entity.js.map