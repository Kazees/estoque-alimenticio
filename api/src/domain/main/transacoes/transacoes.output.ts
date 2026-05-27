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
    produto: { name: string, codigo: string } | null;

    @ApiProperty()
    lote: { numero_lote: number, preco_custo: number, preco_venda: number } | null;

    @ApiProperty()
    quantidade: number;

    @ApiProperty()
    createdAt: Date;

    constructor(transacao: TransacoesEntity) {
        const tp = transacao.transacoesProduto?.[0];
        this.tipo = transacao.tipo;
        this.observacao = transacao.observacao;
        this.funcionario = { name: transacao.funcionario.name, email: transacao.funcionario.email, contato: { ddd: transacao.funcionario.contato.ddd, numero: transacao.funcionario.contato.numero } };
        this.produto = tp?.produto ? { name: tp.produto.name, codigo: tp.produto.codigo } : null;
        this.lote = tp?.lote ? { numero_lote: tp.lote.numero_lote, preco_custo: Number(tp.lote.preco_custo), preco_venda: Number(tp.lote.preco_venda) } : null;
        this.quantidade = tp?.quantidade ?? 0;
        this.createdAt = transacao.createdAt;
    }
}