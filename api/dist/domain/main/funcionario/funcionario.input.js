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
exports.UpdateFuncionarioInput = exports.FuncionarioInput = void 0;
const contato_input_1 = require("../contato/contato.input");
const endereco_input_1 = require("../endereco/endereco.input");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class FuncionarioInput {
    name;
    email;
    password;
    contato;
    endereco;
}
exports.FuncionarioInput = FuncionarioInput;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'João da Silva',
        description: 'Nome do Funcionário',
        required: true
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'O nome deve ser informado' }),
    __metadata("design:type", String)
], FuncionarioInput.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'ZB4b4@example.com',
        description: 'E-mail do Funcionário',
        required: true
    }),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'O e-mail deve ser informado' }),
    __metadata("design:type", String)
], FuncionarioInput.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '123456',
        description: 'Senha do Funcionário',
        required: true
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'A senha deve ser informada' }),
    __metadata("design:type", String)
], FuncionarioInput.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: {
            codigo_pais: '55',
            ddd: '11',
            numero: '12345678'
        },
        description: 'Contato do Funcionário',
        required: true
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'O contato deve ser informado' }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => contato_input_1.ContatoInput),
    __metadata("design:type", contato_input_1.ContatoInput)
], FuncionarioInput.prototype, "contato", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: {
            logradouro: 'Rua 1',
            numero: 1,
            cep: '12345678'
        },
        description: 'Endereço do Funcionário',
        required: true
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'O endereço deve ser informado' }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => endereco_input_1.EnderecoInput),
    __metadata("design:type", endereco_input_1.EnderecoInput)
], FuncionarioInput.prototype, "endereco", void 0);
class UpdateFuncionarioInput extends (0, swagger_1.PartialType)((0, swagger_1.OmitType)(FuncionarioInput, ['password'])) {
}
exports.UpdateFuncionarioInput = UpdateFuncionarioInput;
//# sourceMappingURL=funcionario.input.js.map