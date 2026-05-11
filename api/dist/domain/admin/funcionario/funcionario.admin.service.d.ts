import { CryptoService } from "../../auth/crypto.service";
import { FuncionarioEntity } from "../../main/funcionario/funcionario.entity";
import { FuncionarioInput } from "../../main/funcionario/funcionario.input";
import { FuncionarioAdminRepository } from "./funcionario.admin.repository";
import { ContatoRepository } from "../../main/contato/contato.repository";
import { EnderecoRepository } from "../../main/endereco/endereco.repository";
import { FuncionarioRepository } from "../../main/funcionario/funcionario.repository";
export declare class FuncionarioAdminService {
    private readonly funcionarioAdminRepository;
    private readonly funcionarioRepository;
    private readonly contatoRepository;
    private readonly enderecoRepository;
    private readonly cryptoService;
    constructor(funcionarioAdminRepository: FuncionarioAdminRepository, funcionarioRepository: FuncionarioRepository, contatoRepository: ContatoRepository, enderecoRepository: EnderecoRepository, cryptoService: CryptoService);
    create(input: FuncionarioInput): Promise<FuncionarioEntity>;
    list(): Promise<FuncionarioEntity[]>;
    delete(id: number): Promise<void>;
}
