import { Repository } from "typeorm";
import { EnderecoEntity } from "./endereco.entity";
import { EnderecoInput } from "./endereco.input";
export declare class EnderecoRepository {
    private readonly repository;
    constructor(repository: Repository<EnderecoEntity>);
    save(endereco: EnderecoInput): Promise<EnderecoEntity>;
    find(id: number): Promise<EnderecoEntity | null>;
}
