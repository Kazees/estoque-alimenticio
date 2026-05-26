<template>
    <v-card border>
        <v-card-title class="d-flex justify-space-between align-center pa-4">
            Transações Feitas
        </v-card-title>
        <v-divider />

        <v-data-table
            :headers="headers"
            :items="transacoes"
            :loading="loading"
            class="elevation-1"
        >
            <template v-slot:[`item.tipo`]="{ item }">
                <v-chip :color="item.tipo ? 'error' : 'success'" size="small">
                    {{ formatEnum(item.tipo) }}
                </v-chip>
            </template>

            <template v-slot:[`item.lote.preco_venda`]="{ item }">
                R$ {{  item.lote.preco_venda.toFixed(2) }}
            </template>

            <template v-slot:[`item.createdAt`]="{ item }">
                {{  new Date(item.createdAt).toLocaleDateString('pt-BR') }}
            </template>
        </v-data-table>
    </v-card>
</template>

<script>
import { Format } from '@/scripts/utils/Format';

export default {
    name: 'TransacoesList',
    props: {
        transacoes: {
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
                { title: 'Tipo de Transação', key: 'tipo' },
                { title: 'Observação', key: 'observacao' },
                { title: 'Funcionário', key: 'funcionario.name' },
                { title: 'Produto', key: 'produto.name' },
                { title: 'Lote', key: 'lote.numero_lote' },
                { title: 'Preço de Venda', key: 'lote.preco_venda' },
                { title: 'Quantidade', key: 'quantidade' },
                { title: 'Data da Transação', key: 'createdAt' },
            ]
        }
    },
    methods: {
        formatEnum(value) {
            return Format.formatEnum(value);
        },
    }
}
</script>