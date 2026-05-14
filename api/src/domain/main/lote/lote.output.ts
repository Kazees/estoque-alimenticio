import { ApiProperty } from "@nestjs/swagger";
import { LoteEntity } from "@app/domain/main/lote/lote.entity";

export class LoteOutput {
    @ApiProperty()
    id: number;

    @ApiProperty()
    numero_lote: number;

    @ApiProperty()
    preco_custo: number;

    @ApiProperty()
    preco_venda: number;

    @ApiProperty()
    localizacao: { corredores: string, prateleiras: string, seccoes: string };

    @ApiProperty()
    fornecedor: { nome_empresa: string, contato: { ddd: string, numero: string } };

    @ApiProperty()
    data_entrada: Date;

    @ApiProperty()
    data_validade: Date;

    constructor(lote: LoteEntity) {
        this.id = lote.id;
        this.numero_lote = lote.numero_lote;
        this.preco_custo = Number(lote.preco_custo);
        this.preco_venda = Number(lote.preco_venda);
        this.localizacao = { corredores: lote.localizacao.corredores, prateleiras: lote.localizacao.prateleiras, seccoes: lote.localizacao.seccoes };
        this.fornecedor = { nome_empresa: lote.fornecedor.nome_empresa, contato: { ddd: lote.fornecedor.contato.ddd, numero: lote.fornecedor.contato.numero } };
        this.data_entrada = lote.data_entrada;
        this.data_validade = lote.data_validade;
    }
}