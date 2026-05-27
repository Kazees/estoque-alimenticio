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
    localizacao: { id: number, corredores: string, prateleiras: string, seccoes: string };

    @ApiProperty()
    fornecedor: {
        id: number,
        nome_empresa: string,
        contato: { ddd: string, numero: string },
        endereco: { logradouro: string, numero: number, complemento?: string, cep: string, bairro?: { name: string }, municipio?: { name: string } } | null
    };

    @ApiProperty()
    produto: { id: number, name: string, codigo: string, descricao: string, categoria: string, perecivel: boolean, unidadeMedida: string } | null;

    @ApiProperty()
    quantidade: number;

    @ApiProperty()
    data_entrada: Date;

    @ApiProperty()
    data_validade: Date;

    constructor(lote: LoteEntity) {
        this.id = lote.id;
        this.numero_lote = lote.numero_lote;
        this.preco_custo = Number(lote.preco_custo);
        this.preco_venda = Number(lote.preco_venda);
        this.localizacao = { id: lote.localizacao.id, corredores: lote.localizacao.corredores, prateleiras: lote.localizacao.prateleiras, seccoes: lote.localizacao.seccoes };
        this.fornecedor = {
            id: lote.fornecedor.id,
            nome_empresa: lote.fornecedor.nome_empresa,
            contato: { ddd: lote.fornecedor.contato.ddd, numero: lote.fornecedor.contato.numero },
            endereco: lote.fornecedor.endereco ? {
                logradouro: lote.fornecedor.endereco.logradouro,
                numero: lote.fornecedor.endereco.numero,
                complemento: lote.fornecedor.endereco.complemento,
                cep: lote.fornecedor.endereco.cep,
                bairro: lote.fornecedor.endereco.bairro ? { name: lote.fornecedor.endereco.bairro.name } : undefined,
                municipio: lote.fornecedor.endereco.municipio ? { name: lote.fornecedor.endereco.municipio.name } : undefined
            } : null
        };
        this.produto = lote.produto?.[0]?.produto ? {
            id: lote.produto[0].produto.id,
            name: lote.produto[0].produto.name,
            codigo: lote.produto[0].produto.codigo,
            descricao: lote.produto[0].produto.descricao,
            categoria: lote.produto[0].produto.categoria,
            perecivel: lote.produto[0].produto.perecivel,
            unidadeMedida: lote.produto[0].produto.unidadeMedida
        } : null;
        this.quantidade = lote.produto?.[0]?.quantidade || 0;
        this.data_entrada = lote.data_entrada;
        this.data_validade = lote.data_validade;
    }
}