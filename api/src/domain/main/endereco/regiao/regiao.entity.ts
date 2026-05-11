import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'Regiao' })
export class RegiaoEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ name: 'regiao', nullable: false })
    regiao: string
}