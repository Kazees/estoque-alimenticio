import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { EnderecoEntity } from "./endereco.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { EnderecoInput } from "./endereco.input";

@Injectable()
export class EnderecoRepository {
    constructor(
        @InjectRepository(EnderecoEntity) 
        private readonly repository: Repository<EnderecoEntity>
    ) {}

    async save(endereco: EnderecoInput): Promise<EnderecoEntity> {
        return this.repository.save(endereco);
    }
}