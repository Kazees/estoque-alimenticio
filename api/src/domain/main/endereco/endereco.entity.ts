import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { EnderecoInput } from "@app/domain/main/endereco/endereco.input";
import { BairroEntity } from "@app/domain/main/endereco/bairro/bairro.entity";

@Entity({ name: 'Endereco' })
export class EnderecoEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ name: 'logradouro', nullable: false })
    logradouro: string;

    @Column({ name: 'numero', nullable: false })
    numero: number;

    @Column({ name: 'complemento', nullable: true })
    complemento?: string;

    @Column({ name: 'cep', nullable: false })
    cep: string;

    @Column({ name: 'bairroId', nullable: false })
    bairroId: number

    @ManyToOne(() => BairroEntity, (bairro) => bairro.id)
    @JoinColumn({ name: 'bairroId', referencedColumnName: 'id' })
    bairro: BairroEntity;

    static of(input: EnderecoInput): EnderecoEntity {
        const endereco = new EnderecoEntity();
    
        endereco.logradouro = input.logradouro;
        endereco.numero = input.numero;
        endereco.complemento = input.complemento;
        endereco.cep = input.cep;
        endereco.bairroId = input.bairroId;
    
        return endereco;
    }

    update(input: EnderecoInput) {
        if (input.logradouro) this.logradouro = input.logradouro;
        if (input.numero) this.numero = input.numero;
        if (input.complemento) this.complemento = input.complemento;
        if (input.cep) this.cep = input.cep;
        if (input.bairroId) this.bairroId = input.bairroId;
    }
}