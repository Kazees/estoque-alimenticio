import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ContatoEntity } from "@app/domain/main/contato/contato.entity";
import { EnderecoEntity } from "@app/domain/main/endereco/endereco.entity";
import { FornecedorInput, UpdateFornecedorInput } from "@app/domain/main/fornecedor/fornecedor.input";

@Entity('Fornecedor')
export class FornecedorEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ name: 'nome_empresa', nullable: false })
    nome_empresa: string;

    @Column({ name: 'active', nullable: false, default: true })
    active: boolean;

    @Column({ name: 'contatoId', nullable: false })
    contatoId: number;

    @Column({ name: 'enderecoId', nullable: false })
    enderecoId: number;

    @ManyToOne(() => ContatoEntity, (contato) => contato.id)
    @JoinColumn({ name: 'contatoId', referencedColumnName: 'id' })
    contato: ContatoEntity;

    @ManyToOne(() => EnderecoEntity, (endereco) => endereco.id)
    @JoinColumn({ name: 'enderecoId', referencedColumnName: 'id' })
    endereco: EnderecoEntity;

    static of(input: FornecedorInput, contatoId: ContatoEntity, enderecoId: EnderecoEntity): FornecedorEntity {
        const fornecedor = new FornecedorEntity();
        
        fornecedor.nome_empresa = input.nome_empresa;
        fornecedor.contatoId = contatoId.id;
        fornecedor.enderecoId = enderecoId.id;

        return fornecedor;
    }

    inactive() {
        this.active = false;
    }

    update(input: UpdateFornecedorInput) {
        if (input.nome_empresa) this.nome_empresa = input.nome_empresa;
    }
}    