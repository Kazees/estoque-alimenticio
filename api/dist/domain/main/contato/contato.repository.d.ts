import { ContatoEntity } from "./contato.entity";
import { Repository } from "typeorm";
import { ContatoInput } from "./contato.input";
export declare class ContatoRepository {
    private readonly repository;
    constructor(repository: Repository<ContatoEntity>);
    save(contato: ContatoInput): Promise<ContatoEntity>;
    find(id: number): Promise<ContatoEntity | null>;
}
