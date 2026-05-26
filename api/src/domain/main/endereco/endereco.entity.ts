import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { EnderecoInput } from "@app/domain/main/endereco/endereco.input";
import { BairroEntity } from "@app/domain/main/endereco/bairro/bairro.entity";
import { MunicipioEntity } from "@app/domain/main/endereco/municipio/municipio.entity";

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

    @Column({ name: 'bairroId', nullable: true })
    bairroId?: number;

    @ManyToOne(() => BairroEntity, (bairro) => bairro.id)
    @JoinColumn({ name: 'bairroId', referencedColumnName: 'id' })
    bairro?: BairroEntity;

    @Column({ name: 'municipioId', nullable: true })
    municipioId?: number;

    @ManyToOne(() => MunicipioEntity, (municipio) => municipio.id)
    @JoinColumn({ name: 'municipioId', referencedColumnName: 'id' })
    municipio?: MunicipioEntity;

    static of(input: EnderecoInput): EnderecoEntity {
        const endereco = new EnderecoEntity();

        endereco.logradouro = input.logradouro;
        endereco.numero = input.numero;
        endereco.complemento = input.complemento;
        endereco.cep = input.cep;
        endereco.bairroId = input.bairroId ?? undefined;
        endereco.municipioId = input.municipioId ?? undefined;

        return endereco;
    }

    update(input: EnderecoInput) {
        if (input.logradouro !== undefined) this.logradouro = input.logradouro;
        if (input.numero !== undefined) this.numero = input.numero;
        if (input.complemento !== undefined) this.complemento = input.complemento;
        if (input.cep !== undefined) this.cep = input.cep;
        if (input.bairroId !== undefined) this.bairroId = input.bairroId ?? undefined;
        if (input.municipioId !== undefined) this.municipioId = input.municipioId ?? undefined;
    }
}