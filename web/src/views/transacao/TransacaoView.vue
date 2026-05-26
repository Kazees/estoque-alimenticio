<template>
    <v-container fluid>
        <ToastComponent ref="toast" />

        <div class="d-flex justify-space-between align-center mb-4">
            <span class="text-h5 font-weight-bold">Transações</span>
            <v-btn color="primary" prepend-icon="mdi-plus" @click="openCreate">Nova Transação</v-btn>
        </div>

        <TransacaoFilter />
        <TransacaoList :transacoes="useTransacoesStore.produtos" />

        <v-dialog v-model="dialog" max-width="800px" scrollable>
            <v-card>
                <v-card-title class="d-flex justify-space-between align-center pa-4">
                    {{ 'Registrar Transação' }}
                    <v-icon icon="mdi-close" @click="dialog = false" style="cursor: pointer" />
                </v-card-title>
                <v-divider />
                <v-card-text>
                    <TransacaoForm @submit="handleCreate" :transacao="selectTransacao" :loading="loading" />
                </v-card-text>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
import TransacaoForm from '@/components/transacao/TransacaoForm.vue';
import ToastComponent from '@/components/feedback/ToastComponent.vue';
import TransacaoList from '@/components/transacao/TransacaoList.vue';
import TransacaoFilter from '@/components/transacao/TransacaoFilter.vue';
import { useTransacoesStore } from '@/stores/transcoes.store';
import { TransacaoService } from '@/services/transacao.service';

export default {
    name: 'TransacaoView',
    components: {
        TransacaoForm,
        ToastComponent,
        TransacaoList,
        TransacaoFilter,
    },
    data() {
        return {
            dialog: false,
            loading: false,
            selectTransacao: null, // null = criar, objeto = editar
            transacoes: [],
            useTransacoesStore: useTransacoesStore()
        };
    },
    async created() {
        await this.useTransacoesStore.list();
    },
    methods: {
        openCreate() {
            this.selectTransacao = null;
            this.dialog = true;
        },
        openEdit(transacoes) {
            this.selectTransacao = transacoes;
            this.dialog = true;
        },
        async loadTransacoes() {
            try {
                await this.useTransacoesStore.list();
            }
            catch (error) {
                const msg = error?.response?.data?.message || error?.message || 'Erro ao carregar produtos';
                this.$refs.toast.error(msg);
            }
        },
        async handleCreate(data) {
            this.loading = true;

            try {
                await TransacaoService.save(data);
                this.dialog = false;
                await this.loadTransacoes();
            }
            catch (error) {
                const msg = error?.response?.data?.message || error?.message || 'Erro ao salvar produto';
                this.$refs.toast.error(msg);
            }
            finally {
                this.loading = false;
            }
        },
    }
}
</script>