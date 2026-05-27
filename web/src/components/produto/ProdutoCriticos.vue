<template>
    <v-row class="mb-4" v-if="lotesVencendo.length || produtosEstoqueMinimo.length">
        <v-col cols="12" sm="6" v-if="lotesVencendo.length">
            <v-card color="warning" class="pa-2" variant="tonal">
                <v-card-title prepend-icons="mdi-clock-alert">
                    <v-icon icon="mdi-clock-alert" /> Lotes vencendo em 30 dias: {{ lotesVencendo.length }}
                </v-card-title>

                <v-card-text>
                    <v-chip
                        v-for="(item, i) in lotesVencendo"
                        :key="i"
                        class="ma-1"
                        color="warning"
                        size="small"
                    >
                        {{ item.nome }} ({{ item.fornecedor }}) — {{ item.quantidade }}
                    </v-chip>
                </v-card-text>
            </v-card>
        </v-col>

        <v-col cols="12" sm="6" v-if="produtosEstoqueMinimo.length">
            <v-card color="error" class="pa-2" variant="tonal">
                <v-card-title prepend-icons="mdi-alert">
                    <v-icon icon="mdi-alert" /> Produtos em estoque mínimo: {{ produtosEstoqueMinimo.length }}
                </v-card-title>

                <v-card-text>
                    <v-chip
                        v-for="produto in produtosEstoqueMinimo"
                        :key="produto.id"
                        class="ma-1"
                        color="error"
                        size="small"
                    >
                        {{ produto.name }} — {{ produto.lote?.totalQuantidade }}
                    </v-chip>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
export default {
    name: 'ProdutoCriticos',
    props: {
        produtos: {
            type: Array,
            default: () => []
        }
    },
    computed: {
        lotesVencendo() {
            const hoje = new Date();
            const trintaDias = new Date();
            trintaDias.setDate(trintaDias.getDate() + 30);

            const result = [];
            this.produtos.forEach(produto => {
                if (!produto.lote) return;
                produto.lote.vencimentos.forEach(v => {
                    const validade = new Date(v.data_validade);
                    if (validade <= trintaDias && validade >= hoje) {
                        result.push({
                            nome: produto.name,
                            fornecedor: v.fornecedor,
                            data_validade: v.data_validade,
                            quantidade: v.quantidade
                        });
                    }
                });
            });
            return result;
        },
        produtosEstoqueMinimo() {
            return this.produtos.filter(produto => {
                if (!produto.lote) return false;
                return produto.lote.totalQuantidade <= 10;
            });
        }
    }
}
</script>
