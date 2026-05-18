import { ApiProperty } from "@nestjs/swagger";
import { ContatoEntity } from "@app/domain/main/contato/contato.entity";

export class ContatoOutput {
    @ApiProperty()
    id: number;

    @ApiProperty()
    codigo_pais: string;

    @ApiProperty()
    ddd: string;

    @ApiProperty()
    numero: string;

    constructor(contato: ContatoEntity) {
        this.id = contato.id;
        this.codigo_pais = contato.codigo_pais;
        this.ddd = contato.ddd;
        this.numero = contato.numero;
    }
}
