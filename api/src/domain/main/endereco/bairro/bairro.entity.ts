import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { MunicipioEntity } from "@app/domain/main/endereco/municipio/municipio.entity";

@Entity({ name: 'Bairro' })
export class BairroEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ name: 'name', nullable: false })
    name: string

    @Column({ name: 'municipioId', nullable: false })
    municipioId: number;

    @ManyToOne(() => MunicipioEntity, (municipio) => municipio.id)
    @JoinColumn({ name: 'municipioId', referencedColumnName: 'id' })
    municipio: MunicipioEntity
}