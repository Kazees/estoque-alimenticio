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
exports.FuncionarioOutput = void 0;
const auth_roles_1 = require("../../auth/auth.roles");
const contato_entity_1 = require("../../main/contato/contato.entity");
const endereco_entity_1 = require("../../main/endereco/endereco.entity");
const swagger_1 = require("@nestjs/swagger");
class FuncionarioOutput {
    name;
    email;
    role;
    active;
    contato;
    endereco;
    constructor(funcionario) {
        this.name = funcionario.name;
        this.email = funcionario.email;
        this.role = funcionario.role;
        this.active = funcionario.active;
        this.contato = funcionario.contato;
        this.endereco = funcionario.endereco;
    }
}
exports.FuncionarioOutput = FuncionarioOutput;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], FuncionarioOutput.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], FuncionarioOutput.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], FuncionarioOutput.prototype, "role", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], FuncionarioOutput.prototype, "active", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", contato_entity_1.ContatoEntity)
], FuncionarioOutput.prototype, "contato", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", endereco_entity_1.EnderecoEntity)
], FuncionarioOutput.prototype, "endereco", void 0);
//# sourceMappingURL=funcionario.admin.output.js.map