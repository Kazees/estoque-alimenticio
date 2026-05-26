<template>
    <v-row class="mb-4" v-if="produtosVencendo.length || produtosEstoqueMinimo.length">
        <v-col cols="12" sm="6" v-if="produtosVencendo.length">
            <v-card color="warning" class="pa-2" variant="tonal">
                <v-card-title prepend-icons="mdi-clock-alert">
                    <v-icon icon="mdi-clock-alert" /> Quantidade de produtos vencendo em 30 dias: {{ produtosVencendo.length }}
                </v-card-title>

                <v-card-text>
                    <v-chip
                        v-for="produto in produtosVencendo"
                        :key="produto.id"
                        class="ma-1"
                        color="warning"
                        size="small"
                    >
                        {{ produto.name }} — {{ produto.lote?.quantidade }}
                    </v-chip>
                </v-card-text>
            </v-card>
        </v-col>

        <v-col cols="12" sm="6" v-if="produtosEstoqueMinimo.length">
            <v-card color="error" class="pa-2" variant="tonal">
                <v-card-title prepend-icons="mdi-alert">
                    <v-icon icon="mdi-alert" /> Quantidade de produtos em estoque minimo: {{ produtosEstoqueMinimo.length }}
                </v-card-title>

                <v-card-text>
                    <v-chip
                        v-for="produto in produtosEstoqueMinimo"
                        :key="produto.id"
                        class="ma-1"
                        color="error"
                        size="small"
                    >
                        {{ produto.name }} — {{ produto.lote?.quantidade }}
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
        produtosVencendo() {
            const hoje = new Date();
            const tintraDias = new Date();
            tintraDias.setDate(tintraDias.getDate() + 30); 

            return this.produtos.filter(produto => {
                if (!produto.lote) return false;
                const validade = new Date(produto.lote.data_validade);
                return validade <= tintraDias && validade >= hoje
            })
        },
        produtosEstoqueMinimo() {
            return this.produtos.filter(produto => {
                if (!produto.lote) return false;
                return produto.lote.quantidade <= 10
            })
        }
    },
    methods: {
        formatDate(date) {
            if (!date) return '';
            return new Date(date).toLocaleDateString('pt-BR');
        }
    }

}
</script>