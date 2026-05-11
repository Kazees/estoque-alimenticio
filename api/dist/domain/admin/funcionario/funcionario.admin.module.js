"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FuncionarioAdminModule = void 0;
const auth_module_1 = require("../../auth/auth.module");
const common_1 = require("@nestjs/common");
const funcionario_admin_controller_1 = require("./funcionario.admin.controller");
const funcionario_admin_service_1 = require("./funcionario.admin.service");
const funcionario_admin_repository_1 = require("./funcionario.admin.repository");
const contato_repository_1 = require("../../main/contato/contato.repository");
const endereco_repository_1 = require("../../main/endereco/endereco.repository");
const crypto_service_1 = require("../../auth/crypto.service");
const typeorm_1 = require("@nestjs/typeorm");
const funcionario_entity_1 = require("../../main/funcionario/funcionario.entity");
const contato_entity_1 = require("../../main/contato/contato.entity");
const endereco_entity_1 = require("../../main/endereco/endereco.entity");
const funcionario_repository_1 = require("../../main/funcionario/funcionario.repository");
let FuncionarioAdminModule = class FuncionarioAdminModule {
};
exports.FuncionarioAdminModule = FuncionarioAdminModule;
exports.FuncionarioAdminModule = FuncionarioAdminModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([funcionario_entity_1.FuncionarioEntity, contato_entity_1.ContatoEntity, endereco_entity_1.EnderecoEntity]), (0, common_1.forwardRef)(() => auth_module_1.AuthModule)],
        controllers: [funcionario_admin_controller_1.FuncionarioAdminController],
        providers: [funcionario_admin_service_1.FuncionarioAdminService, funcionario_admin_repository_1.FuncionarioAdminRepository, contato_repository_1.ContatoRepository, endereco_repository_1.EnderecoRepository, crypto_service_1.CryptoService, funcionario_repository_1.FuncionarioRepository],
        exports: [funcionario_admin_service_1.FuncionarioAdminService, funcionario_admin_repository_1.FuncionarioAdminRepository]
    })
], FuncionarioAdminModule);
//# sourceMappingURL=funcionario.admin.module.js.map