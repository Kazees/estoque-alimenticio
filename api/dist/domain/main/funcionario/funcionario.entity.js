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
var FuncionarioEntity_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FuncionarioEntity = void 0;
const auth_roles_1 = require("../../auth/auth.roles");
const contato_entity_1 = require("../contato/contato.entity");
const endereco_entity_1 = require("../endereco/endereco.entity");
const typeorm_1 = require("typeorm");
let FuncionarioEntity = FuncionarioEntity_1 = class FuncionarioEntity {
    id;
    name;
    email;
    password;
    role;
    active;
    contatoId;
    enderecoId;
    createdAt;
    updatedAt;
    contato;
    endereco;
    static of(input, contatoId, enderecoId) {
        const funcionario = new FuncionarioEntity_1();
        funcionario.name = input.name;
        funcionario.email = input.email;
        funcionario.password = input.password;
        funcionario.role = auth_roles_1.AuthRoles.USER;
        funcionario.contatoId = contatoId.id;
        funcionario.enderecoId = enderecoId.id;
        return funcionario;
    }
    inactive() {
        this.active = false;
    }
    update(input) {
        if (input.name)
            this.name = input.name;
        if (input.email)
            this.email = input.email;
        this.updatedAt = new Date();
    }
};
exports.FuncionarioEntity = FuncionarioEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], FuncionarioEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'name', nullable: false }),
    __metadata("design:type", String)
], FuncionarioEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'email', nullable: false }),
    __metadata("design:type", String)
], FuncionarioEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'password', nullable: false }),
    __metadata("design:type", String)
], FuncionarioEntity.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'role', nullable: false, default: 'USER', enum: auth_roles_1.AuthRoles }),
    __metadata("design:type", String)
], FuncionarioEntity.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'active', nullable: false, default: true }),
    __metadata("design:type", Boolean)
], FuncionarioEntity.prototype, "active", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'contatoId', nullable: false }),
    __metadata("design:type", Number)
], FuncionarioEntity.prototype, "contatoId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'enderecoId', nullable: false }),
    __metadata("design:type", Number)
], FuncionarioEntity.prototype, "enderecoId", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'createdAt' }),
    __metadata("design:type", Date)
], FuncionarioEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'updatedAt' }),
    __metadata("design:type", Date)
], FuncionarioEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => contato_entity_1.ContatoEntity, (contato) => contato.id),
    (0, typeorm_1.JoinColumn)({ name: 'contatoId', referencedColumnName: 'id' }),
    __metadata("design:type", contato_entity_1.ContatoEntity)
], FuncionarioEntity.prototype, "contato", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => endereco_entity_1.EnderecoEntity, (endereco) => endereco.id),
    (0, typeorm_1.JoinColumn)({ name: 'enderecoId', referencedColumnName: 'id' }),
    __metadata("design:type", endereco_entity_1.EnderecoEntity)
], FuncionarioEntity.prototype, "endereco", void 0);
exports.FuncionarioEntity = FuncionarioEntity = FuncionarioEntity_1 = __decorate([
    (0, typeorm_1.Entity)({ name: 'Funcionario' })
], FuncionarioEntity);
//# sourceMappingURL=funcionario.entity.js.map