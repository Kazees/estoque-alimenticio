import { FuncionarioEntity } from "./funcionario.entity";
import { UpdateFuncionarioInput } from "./funcionario.input";
import { ContatoRepository } from "../contato/contato.repository";
import { EnderecoRepository } from "../endereco/endereco.repository";
import { FuncionarioRepository } from "./funcionario.repository";
export declare class FuncionarioService {
    private readonly funcionarioRepository;
    private readonly contatoRepository;
    private readonly enderecoRepository;
    constructor(funcionarioRepository: FuncionarioRepository, contatoRepository: ContatoRepository, enderecoRepository: EnderecoRepository);
    update(input: UpdateFuncionarioInput, id: string): Promise<FuncionarioEntity>;
}
