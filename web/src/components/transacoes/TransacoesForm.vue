<template>
    <v-form ref="form">
        <ToastComponent ref="toast" />
        <v-container>
            <v-row>
                <v-col cols="12" sm="6">
                    <v-select
                        v-model="form.tipo"
                        :items="tipos"
                        item-title="text"
                        item-value="value"
                        label="Tipo de Transação *"
                        :rules="[v => !!v || 'Campo obrigatório']"
                        clearable
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
                        v-model="form.produtoId"
                        :items="produtos"
                        item-title="name"
                        item-value="id"
                        label="Produto *"
                        :rules="[v => !!v || 'Campo obrigatório']"
                        @update:model-value="onChangeProduto"
                        clearable
                    />
                </v-col>
                <v-col cols="12" sm="6">
                    <v-select
                        v-model="form.loteId"
                        :items="lotes"
                        :item-title="item => `Lote ${item.numero_lote} - ${item.fornecedor?.nome_empresa}`"
                        item-value="id"
                        label="Lote *"
                        :rules="[v => !!v || 'Campo obrigatório']"
                        clearable
                    />
                </v-col>

                <v-col cols="12">
                    <v-textarea
                        v-model="form.observacao"
                        label="Observação"
                        rows="3"
                        auto-grow
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
import { LoteService } from '@/scripts/services/LoteService';
import { Format } from '@/scripts/utils/Format';
import { TransacaoEnum } from '@/scripts/utils/Enums';

export default {
    name: 'TransacoesForm',
    components: { ToastComponent },
    emits: ['submit'],
    props: {
        transacao: {
            type: Object,
            default: null
        }
    },
    data() {
        return {
            produtos: [],
            lotes: [],
            form: {
                tipo: '',
                observacao: '',
                produtoId: null,
                loteId: null,
                quantidade: '',
            },
            tipos: Object.values(TransacaoEnum).map(value => ({
                text: Format.formatEnum(value),
                value: value
            }))
        };
    },
    async created() {
        this.produtos = await ProdutoService.list();
    },
    methods: {
        async handleSubmit() {
            const { valid } = await this.$refs.form.validate();
            if (!valid) {
                this.$refs.toast.error('Preencha todos os campos obrigatórios');
                return;
            }
            this.$emit('submit', { ...this.form });
        },
        formatEnum(value) { 
            return Format.formatEnum(value); 
        },
        async onChangeProduto(produtoId) {
            this.form.loteId = null;
            this.lotes = produtoId ? await LoteService.listByProduto(produtoId) : [];
        }
    }
}
</script>
