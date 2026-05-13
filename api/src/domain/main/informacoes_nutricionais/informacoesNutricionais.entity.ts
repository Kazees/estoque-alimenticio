import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { InformacoesNutricionaisInput } from "@app/domain/main/informacoes_nutricionais/informacoesNutricionais.input";

@Entity({ name: 'InformacoesNutricionais' })
export class InformacoesNutricionaisEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ name: 'ingredientes', nullable: false })
    ingredientes: string;

    @Column({ name: 'alergenicos', nullable: true })
    alergenicos: string;

    static of(input: InformacoesNutricionaisInput): InformacoesNutricionaisEntity {
        const informacoesNutricionais = new InformacoesNutricionaisEntity();

        informacoesNutricionais.ingredientes = input.ingredientes;
        if (input.alergenicos) informacoesNutricionais.alergenicos = input.alergenicos;
        
        return informacoesNutricionais;
    }

    update(input: InformacoesNutricionaisInput) {
        if (input.ingredientes) this.ingredientes = input.ingredientes;
        if (input.alergenicos) this.alergenicos = input.alergenicos;
    }
}