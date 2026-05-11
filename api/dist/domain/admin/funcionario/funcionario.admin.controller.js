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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FuncionarioAdminController = void 0;
const auth_admin_guard_1 = require("../../auth/auth.admin.guard");
const funcionario_input_1 = require("../../main/funcionario/funcionario.input");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const funcionario_admin_service_1 = require("./funcionario.admin.service");
const funcionario_admin_output_1 = require("./funcionario.admin.output");
let FuncionarioAdminController = class FuncionarioAdminController {
    funcionarioAdminService;
    constructor(funcionarioAdminService) {
        this.funcionarioAdminService = funcionarioAdminService;
    }
    async create(input) {
        const entity = await this.funcionarioAdminService.create(input);
        return new funcionario_admin_output_1.FuncionarioOutput(entity);
    }
    async list() {
        const entities = await this.funcionarioAdminService.list();
        return entities.map(entity => new funcionario_admin_output_1.FuncionarioOutput(entity));
    }
    async delete(id) {
        await this.funcionarioAdminService.delete(id);
    }
};
exports.FuncionarioAdminController = FuncionarioAdminController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Cria um novo funcionário',
        description: 'Cria um novo funcionário'
    }),
    (0, swagger_1.ApiBody)({ type: funcionario_input_1.FuncionarioInput, description: 'Informações do novo funcionário' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Funcionario criado com sucesso', type: funcionario_admin_output_1.FuncionarioOutput }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Funcionario sem permissão' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [funcionario_input_1.FuncionarioInput]),
    __metadata("design:returntype", Promise)
], FuncionarioAdminController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Busca todos os funcionários',
        description: 'Busca todos os funcionários'
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Funcionários encontrados', type: [funcionario_admin_output_1.FuncionarioOutput] }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Funcionario sem permissão' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FuncionarioAdminController.prototype, "list", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Deleta um funcionário',
        description: 'Deleta um funcionário'
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID do funcionário', type: 'number' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Funcionario deletado com sucesso' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Funcionario sem permissão' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], FuncionarioAdminController.prototype, "delete", null);
exports.FuncionarioAdminController = FuncionarioAdminController = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiTags)('Admin Funcionario'),
    (0, common_1.UseGuards)(auth_admin_guard_1.AuthAdminGuard),
    (0, common_1.Controller)('admin/funcionario'),
    __metadata("design:paramtypes", [funcionario_admin_service_1.FuncionarioAdminService])
], FuncionarioAdminController);
//# sourceMappingURL=funcionario.admin.controller.js.map