import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { EstadoEntity } from "@app/domain/main/endereco/estado/estado.entity";

@Entity({ name: 'Municipio' })
export class MunicipioEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ name: 'codigo', nullable: false })
    codigo: string;

    @Column({ name: 'name', nullable: false })
    name: string;

    @Column({ name: 'estadoId', nullable: false })
    estadoId: number;

    @ManyToOne(() => EstadoEntity, (estado) => estado.id)
    @JoinColumn({ name: 'estadoId', referencedColumnName: 'id' })
    estado: EstadoEntity;
}