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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const crypto_service_1 = require("./crypto.service");
const auth_output_1 = require("./auth.output");
const funcionario_admin_repository_1 = require("../admin/funcionario/funcionario.admin.repository");
let AuthService = class AuthService {
    funcionarioRepository;
    cryptoService;
    constructor(funcionarioRepository, cryptoService) {
        this.funcionarioRepository = funcionarioRepository;
        this.cryptoService = cryptoService;
    }
    async login(email, password) {
        const auth = await this.funcionarioRepository.findByEmail(email.trim().toLowerCase());
        if (!auth)
            throw new common_1.UnauthorizedException({ message: 'Funcionário nao encontrado' });
        const authenticated = await this.cryptoService.verify(password, auth.password);
        if (!authenticated)
            throw new common_1.UnauthorizedException({ message: 'Senha inválida' });
        const payload = {
            sub: String(auth.id),
            email: auth.email,
            role: auth.role,
            name: auth.name
        };
        const token = await this.cryptoService.token(payload);
        return new auth_output_1.AuthOutput(token, payload);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [funcionario_admin_repository_1.FuncionarioAdminRepository,
        crypto_service_1.CryptoService])
], AuthService);
//# sourceMappingURL=auth.service.js.map