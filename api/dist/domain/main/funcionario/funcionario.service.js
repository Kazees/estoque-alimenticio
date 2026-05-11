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
exports.FuncionarioService = void 0;
const common_1 = require("@nestjs/common");
const contato_repository_1 = require("../contato/contato.repository");
const endereco_repository_1 = require("../endereco/endereco.repository");
const funcionario_repository_1 = require("./funcionario.repository");
let FuncionarioService = class FuncionarioService {
    funcionarioRepository;
    contatoRepository;
    enderecoRepository;
    constructor(funcionarioRepository, contatoRepository, enderecoRepository) {
        this.funcionarioRepository = funcionarioRepository;
        this.contatoRepository = contatoRepository;
        this.enderecoRepository = enderecoRepository;
    }
    async update(input, id) {
        const funcionario = await this.funcionarioRepository.find(Number(id));
        if (!funcionario)
            throw new common_1.NotFoundException('Funcionario nao encontrado');
        if (input.contato) {
            const contato = await this.contatoRepository.find(funcionario.contatoId);
            if (!contato)
                throw new common_1.NotFoundException('Contato nao encontrado');
            contato.update(input.contato);
            await this.contatoRepository.save(contato);
        }
        if (input.endereco) {
            const endereco = await this.enderecoRepository.find(funcionario.enderecoId);
            if (!endereco)
                throw new common_1.NotFoundException('Endereco nao encontrado');
            endereco.update(input.endereco);
            await this.enderecoRepository.save(endereco);
        }
        funcionario.update(input);
        await this.funcionarioRepository.update(funcionario, Number(id));
        return funcionario;
    }
};
exports.FuncionarioService = FuncionarioService;
exports.FuncionarioService = FuncionarioService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [funcionario_repository_1.FuncionarioRepository,
        contato_repository_1.ContatoRepository,
        endereco_repository_1.EnderecoRepository])
], FuncionarioService);
//# sourceMappingURL=funcionario.service.js.map