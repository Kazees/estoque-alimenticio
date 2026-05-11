import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { LocalizacaoInput } from "@app/domain/main/localizacao/localizacao.input";

@Entity({ name: 'Localizacao' })
export class LocalizacaoEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'corredores', nullable: false })
    corredores: string;

    @Column({ name: 'prateleiras', nullable: false })
    prateleiras: string;

    @Column({ name: 'seccoes', nullable: false })
    seccoes: string;

    static of(input: LocalizacaoInput): LocalizacaoEntity {
        const localizacao = new LocalizacaoEntity();

        localizacao.corredores = input.corredores;
        localizacao.prateleiras = input.prateleiras;
        localizacao.seccoes = input.seccoes;

        return localizacao;
    }

    update(input: LocalizacaoInput) {
        if (input.corredores) this.corredores = input.corredores;
        if (input.prateleiras) this.prateleiras = input.prateleiras;
        if (input.seccoes) this.seccoes = input.seccoes;
    }
}