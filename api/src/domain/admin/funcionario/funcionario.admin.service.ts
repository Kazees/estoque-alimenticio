import { CryptoService } from "@app/domain/auth/crypto.service";
import { FuncionarioEntity } from "@app/domain/main/funcionario/funcionario.entity";
import { FuncionarioInput } from "@app/domain/main/funcionario/funcionario.input";
import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { FuncionarioAdminRepository } from "@app/domain/admin/funcionario/funcionario.admin.repository";
import { ContatoRepository } from "@app/domain/main/contato/contato.repository";
import { EnderecoRepository } from "@app/domain/main/endereco/endereco.repository";
import { FuncionarioRepository } from "@app/domain/main/funcionario/funcionario.repository";
import { AuthRoles } from "@app/domain/auth/auth.roles";

@Injectable()
export class FuncionarioAdminService {
    constructor (
        private readonly funcionarioAdminRepository: FuncionarioAdminRepository,
        private readonly funcionarioRepository: FuncionarioRepository,
        private readonly contatoRepository: ContatoRepository,
        private readonly enderecoRepository: EnderecoRepository,
        private readonly cryptoService: CryptoService
    ) {}

    async create(input: FuncionarioInput): Promise<FuncionarioEntity> {
        const contato = await this.contatoRepository.save(input.contato);
        const endereco = await this.enderecoRepository.save(input.endereco);
        const password = await this.cryptoService.hash(input.password);

        return this.funcionarioAdminRepository.save(FuncionarioEntity.of({ ...input, password }, contato, endereco));
    }

    async list(): Promise<FuncionarioEntity[]> {
        return this.funcionarioAdminRepository.list();
    }

    async delete(id: number): Promise<void> {
        const funcionario: FuncionarioEntity | null = await this.funcionarioRepository.find(id);

        if (!funcionario) throw new NotFoundException('Funcionario nao encontrado');
        if (funcionario.role === AuthRoles.ADMIN) throw new ForbiddenException('Funcionario nao pode ser excluido');

        funcionario.inactive();
        await this.funcionarioAdminRepository.save(funcionario);
    }
}