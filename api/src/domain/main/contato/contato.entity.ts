import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";
import { ContatoInput } from "@app/domain/main/contato/contato.input";

@Entity({ name: 'Contato' })
@Unique(['codigo_pais', 'ddd', 'numero'])
export class ContatoEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ name: 'codigo_pais', nullable: false })
    codigo_pais: string;

    @Column({ name: 'ddd', nullable: false })
    ddd: string;

    @Column({ name: 'numero', nullable: false, unique: true })
    numero: string;

    static of(input: ContatoInput) {
        const contato = new ContatoEntity();

        contato.codigo_pais = input.codigo_pais;
        contato.ddd = input.ddd;
        contato.numero = input.numero;

        return contato;
    }
}