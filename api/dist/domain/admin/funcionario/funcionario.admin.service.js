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
exports.FuncionarioAdminService = void 0;
const crypto_service_1 = require("../../auth/crypto.service");
const funcionario_entity_1 = require("../../main/funcionario/funcionario.entity");
const common_1 = require("@nestjs/common");
const funcionario_admin_repository_1 = require("./funcionario.admin.repository");
const contato_repository_1 = require("../../main/contato/contato.repository");
const endereco_repository_1 = require("../../main/endereco/endereco.repository");
const funcionario_repository_1 = require("../../main/funcionario/funcionario.repository");
let FuncionarioAdminService = class FuncionarioAdminService {
    funcionarioAdminRepository;
    funcionarioRepository;
    contatoRepository;
    enderecoRepository;
    cryptoService;
    constructor(funcionarioAdminRepository, funcionarioRepository, contatoRepository, enderecoRepository, cryptoService) {
        this.funcionarioAdminRepository = funcionarioAdminRepository;
        this.funcionarioRepository = funcionarioRepository;
        this.contatoRepository = contatoRepository;
        this.enderecoRepository = enderecoRepository;
        this.cryptoService = cryptoService;
    }
    async create(input) {
        const contato = await this.contatoRepository.save(input.contato);
        const endereco = await this.enderecoRepository.save(input.endereco);
        const password = await this.cryptoService.hash(input.password);
        return this.funcionarioAdminRepository.save(funcionario_entity_1.FuncionarioEntity.of({ ...input, password }, contato, endereco));
    }
    async list() {
        return this.funcionarioAdminRepository.list();
    }
    async delete(id) {
        const funcionario = await this.funcionarioRepository.find(id);
        if (!funcionario)
            throw new common_1.NotFoundException('Funcionario nao encontrado');
        funcionario.inactive();
        await this.funcionarioAdminRepository.save(funcionario);
    }
};
exports.FuncionarioAdminService = FuncionarioAdminService;
exports.FuncionarioAdminService = FuncionarioAdminService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [funcionario_admin_repository_1.FuncionarioAdminRepository,
        funcionario_repository_1.FuncionarioRepository,
        contato_repository_1.ContatoRepository,
        endereco_repository_1.EnderecoRepository,
        crypto_service_1.CryptoService])
], FuncionarioAdminService);
//# sourceMappingURL=funcionario.admin.service.js.map