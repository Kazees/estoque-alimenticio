import { TransacaoEnum } from "@app/domain/shared/enums/transacao.enum";
import { ApiProperty } from "@nestjs/swagger";
import { TransacoesEntity } from "@app/domain/main/transacoes/transacoes.entity";

export class TransacoesOutput {
    @ApiProperty()
    tipo: TransacaoEnum;

    @ApiProperty()
    observacao?: string;

    @ApiProperty()
    funcionario: { name: string, email: string, contato: { ddd: string, numero: string } };

    @ApiProperty()
    produto:  {name: string, codigo: string }

    @ApiProperty()
    lote: { numero_lote: number, preco_custo: number, preco_venda: number }

    @ApiProperty()
    quantidade: number;

    @ApiProperty()
    createdAt: Date;

    constructor(transacao: TransacoesEntity) {
        this.tipo = transacao.tipo;
        this.observacao = transacao.observacao;
        this.funcionario = { name: transacao.funcionario.name, email: transacao.funcionario.email, contato: { ddd: transacao.funcionario.contato.ddd, numero: transacao.funcionario.contato.numero } };
        this.produto = { name: transacao.transacoesProduto[0].produto.name, codigo: transacao.transacoesProduto[0].produto.codigo };
        this.lote = { numero_lote: transacao.transacoesProduto[0].lote.numero_lote, preco_custo: transacao.transacoesProduto[0].lote.preco_custo, preco_venda: transacao.transacoesProduto[0].lote.preco_venda };
        this.quantidade = transacao.transacoesProduto[0].quantidade;
        this.createdAt = transacao.createdAt;       
    }
}