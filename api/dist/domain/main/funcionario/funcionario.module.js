"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FuncionarioModule = void 0;
const common_1 = require("@nestjs/common");
const funcionario_entity_1 = require("./funcionario.entity");
const typeorm_1 = require("@nestjs/typeorm");
const funcionario_controller_1 = require("./funcionario.controller");
const funcionario_repository_1 = require("./funcionario.repository");
const funcionario_service_1 = require("./funcionario.service");
const contato_entity_1 = require("../contato/contato.entity");
const endereco_entity_1 = require("../endereco/endereco.entity");
const contato_repository_1 = require("../contato/contato.repository");
const endereco_repository_1 = require("../endereco/endereco.repository");
let FuncionarioModule = class FuncionarioModule {
};
exports.FuncionarioModule = FuncionarioModule;
exports.FuncionarioModule = FuncionarioModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([funcionario_entity_1.FuncionarioEntity, contato_entity_1.ContatoEntity, endereco_entity_1.EnderecoEntity])],
        controllers: [funcionario_controller_1.FuncionarioController],
        providers: [funcionario_repository_1.FuncionarioRepository, funcionario_service_1.FuncionarioService, contato_repository_1.ContatoRepository, endereco_repository_1.EnderecoRepository],
        exports: [funcionario_service_1.FuncionarioService, funcionario_repository_1.FuncionarioRepository]
    })
], FuncionarioModule);
//# sourceMappingURL=funcionario.module.js.map