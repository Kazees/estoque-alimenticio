import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ContatoEntity } from "@app/domain/main/contato/contato.entity";
import { Repository } from "typeorm";
import { ContatoInput } from "./contato.input";

@Injectable()
export class ContatoRepository {
    constructor(
        @InjectRepository(ContatoEntity) 
        private readonly repository: Repository<ContatoEntity>
    ) {}

    async save(contato: ContatoInput): Promise<ContatoEntity> {
        return this.repository.save(contato);
    }
}