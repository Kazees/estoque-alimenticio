import { FuncionarioEntity } from "@app/domain/main/funcionario/funcionario.entity";
import { UpdateFuncionarioInput } from "@app/domain/main/funcionario/funcionario.input";
import { Injectable, NotFoundException } from "@nestjs/common";
import { ContatoRepository } from "@app/domain/main/contato/contato.repository";
import { EnderecoRepository } from "@app/domain/main/endereco/endereco.repository";
import { FuncionarioRepository } from "@app/domain/main/funcionario/funcionario.repository";
import { ContatoEntity } from "@app/domain/main/contato/contato.entity";
import { EnderecoEntity } from "@app/domain/main/endereco/endereco.entity";

@Injectable()
export class FuncionarioService {
    constructor (
        private readonly funcionarioRepository: FuncionarioRepository,
        private readonly contatoRepository: ContatoRepository,
        private readonly enderecoRepository: EnderecoRepository,
    ) {}

    async update(input: UpdateFuncionarioInput, id: string): Promise<FuncionarioEntity> {
        const funcionario: FuncionarioEntity | null = await this.funcionarioRepository.find(Number(id));
        if (!funcionario) throw new NotFoundException('Funcionario nao encontrado');

        if (input.contato) {
            const contato: ContatoEntity | null = await this.contatoRepository.find(funcionario.contatoId);
            if (!contato) throw new NotFoundException('Contato nao encontrado');

            contato.update(input.contato);
            await this.contatoRepository.save(contato);
        }

        if (input.endereco) {
            const endereco: EnderecoEntity | null = await this.enderecoRepository.find(funcionario.enderecoId);
            if (!endereco) throw new NotFoundException('Endereco nao encontrado');

            endereco.update(input.endereco);
            await this.enderecoRepository.save(endereco);
        }

        funcionario.update(input);
        await this.funcionarioRepository.update(funcionario, Number(id));
        
        return funcionario;
    }
}