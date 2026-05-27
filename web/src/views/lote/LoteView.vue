<template>
    <v-container fluid>
        <ToastComponent ref="toast" />

        <div class="d-flex justify-space-between align-center mb-4">
            <span class="text-h5 font-weight-bold">Lotes</span>
            <v-btn color="primary" prepend-icon="mdi-plus" @click="openCreate">Novo Lote</v-btn>
        </div>
        <LoteList :lotes="lotes" :loading="loading" @view="openView" />

        <v-dialog v-model="dialog" max-width="800px" scrollable>
            <v-card>
                <v-card-title class="d-flex justify-space-between align-center pa-4">
                    {{ selectLote ? 'Visualizar Lote' : 'Criar Lote'  }}
                    <v-icon icon="mdi-close" @click="dialog = false" style="cursor: pointer" />
                </v-card-title>
                <v-divider />
               <v-card-text>
                    <LoteForm @submit="handleSubmit" :lote="selectLote" :loading="loading" :readOnly="!!selectLote" />
                </v-card-text>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
import LoteForm from '@/components/lote/LoteForm.vue';
import LoteList from '@/components/lote/LoteList.vue';
import ToastComponent from '@/components/feedback/ToastComponent.vue';
import { LoteService } from '@/scripts/services/LoteService';

export default {
    name: 'LoteView',
    components: {
        LoteForm,
        LoteList,
        ToastComponent,
    },
    data() {
        return {
            dialog: false,
            loading: false,
            selectLote: null,
            lotes: [],
        };
    },
    async created() {
        await this.loadLotes();
    },
    methods: {
        openCreate() {
            this.selectLote = null;
            this.dialog = true;
        },
        openView(lote) {
            this.selectLote = lote;
            this.dialog = true;
        },
        async loadLotes() {
            try {
                this.lotes = await LoteService.list();
            } catch (error) {
                const msg = error?.response?.data?.message || error?.message || 'Erro ao carregar lotes';
                this.$refs.toast.error(msg);
            }
        },
        async handleSubmit(data) {
            this.loading = true;
            try {
                await LoteService.save(data);
                this.dialog = false;
                await this.loadLotes();
                this.$refs.toast.success('Lote salvo com sucesso');
            } catch (error) {
                const msg = error?.response?.data?.message || error?.message || 'Erro ao salvar lote';
                this.$refs.toast.error(msg);
            } finally {
                this.loading = false;
            }
        }
    }
}
</script>
