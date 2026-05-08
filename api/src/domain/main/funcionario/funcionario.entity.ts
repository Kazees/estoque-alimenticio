import { AuthRoles } from "@app/domain/auth/auth.roles";
import { ContatoEntity } from "@app/domain/main/contato/contato.entity";
import { EnderecoEntity } from "@app/domain/main/endereco/endereco.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { FuncionarioInput } from "@app/domain/main/funcionario/funcionario.input";

@Entity({ name: 'Funcionario' })
export class FuncionarioEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'name', nullable: false })
    name: string;

    @Column({ name: 'email', nullable: false })
    email: string;

    @Column({ name: 'password', nullable: false })
    password: string;

    @Column({ name: 'role', nullable: false, default: 'USER' , enum: AuthRoles })
    role: AuthRoles;

    @Column({ name: 'active', nullable: false, default: true })
    active: boolean;

    @Column({ name: 'contatoId', nullable: false })
    contatoId: number; 

    @Column({ name: 'enderecoId', nullable: false })
    enderecoId: number;

    @CreateDateColumn({ name: 'createdAt'})
    createdAt: Date;

    @CreateDateColumn({ name: 'updatedAt'})
    updatedAt: Date;

    @ManyToOne(() => ContatoEntity, (contato) => contato.id)
    @JoinColumn({ name: 'contatoId', referencedColumnName: 'id' })
    contato: ContatoEntity;

    @ManyToOne(() => EnderecoEntity, (endereco) => endereco.id)
    @JoinColumn({ name: 'enderecoId', referencedColumnName: 'id' })
    endereco: EnderecoEntity;

    static of(input: FuncionarioInput, contatoId: ContatoEntity, enderecoId: EnderecoEntity): FuncionarioEntity {
        const funcionario = new FuncionarioEntity();

        funcionario.name = input.name;
        funcionario.email = input.email;
        funcionario.password = input.password;
        funcionario.role = AuthRoles.USER;
        funcionario.contatoId = contatoId.id;
        funcionario.enderecoId = enderecoId.id;

        return funcionario;
    }

    inactive () {
        this.active = false;
    }
}