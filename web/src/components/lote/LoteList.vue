<template>
    <v-card border>
        <v-card-title class="d-flex justify-space-between align-center pa-4">
            Lotes Cadastrados
        </v-card-title>
        <v-divider />

        <v-data-table
            :headers="headers"
            :items="lotes"
            :loading="loading"
            class="elevation-1"
        >

            <template v-slot:[`item.preco_custo`]="{ item }">
                R$ {{  item.preco_custo.toFixed(2) }}
            </template>

            <template v-slot:[`item.preco_venda`]="{ item }">
                R$ {{  item.preco_venda.toFixed(2) }}
            </template>

            <template v-slot:[`item.data_validade`]="{ item }">
                {{  new Date(item.data_validade).toLocaleDateString('pt-BR') }}
            </template>

            <template v-slot:[`item.localizacao.corredores`]="{ item }">
                {{ item.localizacao?.corredores }} - {{ item.localizacao?.prateleiras }} - {{ item.localizacao?.seccoes }}
            </template>

            <template v-slot:[`item.data_entrada`]="{ item }">
                {{  new Date(item.data_entrada).toLocaleDateString('pt-BR') }}
            </template>
        </v-data-table>
    </v-card>
</template>

<script>

export default {
    name: 'LoteList',
    props: {
        lotes: {
            type: Array,
            default: () => []
        },
        loading: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            headers: [
                { title: 'Número do Lote', key: 'numero_lote' },
                { title: 'Preço de Custo', key: 'preco_custo' },
                { title: 'Preço de Venda', key: 'preco_venda' },
                { title: 'Data de Validade', key: 'data_validade' },
                { title: 'Data de Entrada', key: 'data_entrada' },
                { title: 'Fornecedor', key: 'fornecedor.nome_empresa' },
                { title: 'Produto', key: 'produto.name' },
                { title: 'Localização', key: 'localizacao.corredores' },
            ]
        }
    },
}
</script>