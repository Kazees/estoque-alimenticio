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
exports.AuthOutput = void 0;
const swagger_1 = require("@nestjs/swagger");
const auth_roles_1 = require("./auth.roles");
class AuthOutput {
    nome;
    email;
    role;
    token;
    constructor(token, auth) {
        this.nome = auth.name;
        this.email = auth.email;
        this.role = auth.role;
        this.token = token;
    }
}
exports.AuthOutput = AuthOutput;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AuthOutput.prototype, "nome", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AuthOutput.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: auth_roles_1.AuthRoles }),
    __metadata("design:type", String)
], AuthOutput.prototype, "role", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AuthOutput.prototype, "token", void 0);
//# sourceMappingURL=auth.output.js.map