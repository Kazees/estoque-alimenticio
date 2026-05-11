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
exports.FuncionarioController = void 0;
const funcionario_input_1 = require("./funcionario.input");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const funcionario_admin_output_1 = require("../../admin/funcionario/funcionario.admin.output");
const auth_guard_1 = require("../../auth/auth.guard");
const funcionario_service_1 = require("./funcionario.service");
let FuncionarioController = class FuncionarioController {
    funcinarioService;
    constructor(funcinarioService) {
        this.funcinarioService = funcinarioService;
    }
    async update(input, request) {
        const entity = await this.funcinarioService.update(input, request.auth.sub);
        return new funcionario_admin_output_1.FuncionarioOutput(entity);
    }
};
exports.FuncionarioController = FuncionarioController;
__decorate([
    (0, common_1.Patch)('/me'),
    (0, swagger_1.ApiOperation)({
        summary: 'Atualiza o funcionário logado',
        description: 'Atualiza o funcionário logado'
    }),
    (0, swagger_1.ApiBody)({ type: funcionario_input_1.UpdateFuncionarioInput, description: 'Informações do novo funcionário' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Funcionario criado com sucesso', type: funcionario_admin_output_1.FuncionarioOutput }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Funcionario sem permissão' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [funcionario_input_1.UpdateFuncionarioInput, Object]),
    __metadata("design:returntype", Promise)
], FuncionarioController.prototype, "update", null);
exports.FuncionarioController = FuncionarioController = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiTags)('Funcionario'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Controller)('/funcionario'),
    __metadata("design:paramtypes", [funcionario_service_1.FuncionarioService])
], FuncionarioController);
//# sourceMappingURL=funcionario.controller.js.map