import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { RegiaoEntity } from "@app/domain/main/endereco/regiao/regiao.entity";

@Entity({ name: 'Estado' })
export class EstadoEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ name: 'codigoUf', nullable: false })
    codigoUf: number;

    @Column({ name: 'name', nullable: false })
    name: string;

    @Column({ name: 'uf', nullable: false })
    uf: string;

    @Column({ name: 'regiaoId', nullable: false })
    regiaoId: number

    @ManyToOne(() => RegiaoEntity, (regiao) => regiao.id)
    @JoinColumn({ name: 'regiaoId', referencedColumnName: 'id' })
    regiao: RegiaoEntity
}