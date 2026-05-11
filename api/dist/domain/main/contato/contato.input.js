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
exports.ContatoInput = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class ContatoInput {
    codigo_pais;
    ddd;
    numero;
}
exports.ContatoInput = ContatoInput;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '1234',
        description: 'Código do País',
        required: true
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'O código do país deve ser informado' }),
    __metadata("design:type", String)
], ContatoInput.prototype, "codigo_pais", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '11',
        description: 'DDD',
        required: true
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'O DDD deve ser informado' }),
    __metadata("design:type", String)
], ContatoInput.prototype, "ddd", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '12345678',
        description: 'Número do Contato',
        required: true
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'O número do contato deve ser informado' }),
    __metadata("design:type", String)
], ContatoInput.prototype, "numero", void 0);
//# sourceMappingURL=contato.input.js.map