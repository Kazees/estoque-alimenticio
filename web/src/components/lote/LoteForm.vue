<template>
    <v-form ref="form">
        <ToastComponent ref="toast" />
        <v-container>
            <v-row>
                <v-col cols="12" sm="4">
                    <v-text-field
                        v-model="form.numero_lote"
                        label="Número do Lote *"
                        type="number"
                        clearable
                        :rules="[v => !!v || 'Campo obrigatório']"
                    />
                </v-col>
                <v-col cols="12" sm="4">
                    <v-text-field
                        v-model="form.preco_custo"
                        label="Preço de Custo *"
                        prefix="R$"
                        type="number"
                        persistent-hint
                        hint="Preço baseado no conjunto de produtos"
                        :rules="[v => !!v || 'Campo obrigatório']"
                    />
                </v-col>
                <v-col cols="12" sm="4">
                    <v-text-field
                        v-model="form.preco_venda"
                        label="Preço de Venda *"
                        prefix="R$"
                        type="number"
                        persistent-hint
                        hint="Preço baseado no conjunto de produtos"
                        :rules="[v => !!v || 'Campo obrigatório']"
                    />
                </v-col>

                <v-col cols="12" sm="6">
                    <v-text-field
                        v-model="form.data_entrada"
                        label="Data de Entrada *"
                        type="date"
                        :rules="[v => !!v || 'Campo obrigatório']"
                    />
                </v-col>
                <v-col cols="12" sm="6">
                    <v-text-field
                        v-model="form.data_validade"
                        label="Data de Validade *"
                        type="date"
                        :rules="[v => !!v || 'Campo obrigatório']"
                    />
                </v-col>

                <v-col cols="12" sm="6">
                    <v-select
                        v-model="form.produtoId"
                        :items="produtos"
                        item-title="name"
                        item-value="id"
                        label="Produto *"
                        :rules="[v => !!v || 'Campo obrigatório']"
                    />
                </v-col>
                <v-col cols="12" sm="6">
                    <v-text-field
                        v-model="form.quantidade"
                        label="Quantidade *"
                        type="number"
                        :rules="[v => !!v || 'Campo obrigatório']"
                    />
                </v-col>

                <v-col cols="12" sm="6">
                    <v-select
                        v-model="form.fornecedorId"
                        :items="fornecedores"
                        item-title="nome_empresa"
                        item-value="id"
                        label="Fornecedor *"
                        :rules="[v => !!v || 'Campo obrigatório']"
                    />
                </v-col>
                <v-col cols="12" sm="6">
                    <v-select
                        v-model="form.localizacaoId"
                        :items="localizacoes"
                        :item-title="item => `${item.corredores} - ${item.prateleiras} - ${item.seccoes}`"
                        item-value="id"
                        label="Localização *"
                        :rules="[v => !!v || 'Campo obrigatório']"
                    />
                </v-col>
            </v-row>
        </v-container>

        <v-card-actions class="justify-center">
            <v-btn color="primary" variant="elevated" @click="handleSubmit">Salvar</v-btn>
        </v-card-actions>
    </v-form>
</template>

<script>
import ToastComponent from '@/components/feedback/ToastComponent.vue';
import { ProdutoService } from '@/scripts/services/ProdutoService';
import { FornecedorService } from '@/scripts/services/FornecedorService';
import { LoteService } from '@/scripts/services/LoteService';

export default {
    name: 'LoteForm',
    components: { ToastComponent },
    emits: ['submit'],
    props: {
        lote: {
            type: Object,
            default: null
        }
    },
    data() {
        return {
            produtos: [],
            fornecedores: [],
            localizacoes: [],
            form: {
                numero_lote: '',
                preco_custo: '',
                preco_venda: '',
                produtoId: null,
                quantidade: '',
                fornecedorId: null,
                localizacaoId: null,
                data_entrada: '',
                data_validade: ''
            }
        };
    },
    async created() {
        const [produtos, fornecedores, localizacoes] = await Promise.all([
            ProdutoService.list(),
            FornecedorService.list(),
            LoteService.listLocalizacao()
        ]);
        this.produtos = produtos;
        this.fornecedores = fornecedores;
        this.localizacoes = localizacoes;
    },
    methods: {
        async handleSubmit() {
            const { valid } = await this.$refs.form.validate();
            if (!valid) {
                this.$refs.toast.error('Preencha todos os campos obrigatórios');
                return;
            }
            this.$emit('submit', { ...this.form });
        }
    }
}
</script>
