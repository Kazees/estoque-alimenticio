<template>
    <v-container fluid>
        <ToastComponent ref="toast" />

        <div class="d-flex justify-space-between align-center mb-4">
            <span class="text-h5 font-weight-bold">Fornecedores</span>
            <v-btn color="primary" prepend-icon="mdi-plus" @click="openCreate">Novo Fornecedor</v-btn>
        </div>

        <FornecedorList :fornecedores="fornecedores" @edit="openEdit" @delete="openDelete" />
        <ConfirmComponent ref="confirmDialog" @confirm="confirmDelete" @cancel="cancelDelete"/>

        <v-dialog v-model="dialog" max-width="800px" scrollable>
            <v-card>
                <v-card-title class="d-flex justify-space-between align-center pa-4">
                    {{ selectFornecedor ? 'Editar Fornecedor' : 'Criar Fornecedor' }}
                    <v-icon icon="mdi-close" @click="dialog = false" style="cursor: pointer" />
                </v-card-title>
                <v-divider />
                <v-card-text>
                    <FornecedorForm @submit="handleSubmit" :fornecedor="selectFornecedor" :loading="loading" />
                </v-card-text>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
import FornecedorForm from '@/components/fornecedor/FornecedorForm.vue';
import ToastComponent from '@/components/feedback/ToastComponent.vue';
import FornecedorList from '@/components/fornecedor/FornecedorList.vue';
import ConfirmComponent from '@/components/feedback/ConfirmComponent.vue';
import { FornecedorService } from '@/scripts/services/FornecedorService';

export default {
    name: 'FornecedorView',
    components: {
        FornecedorForm,
        ToastComponent,
        FornecedorList,
        ConfirmComponent
    },
    data() {
        return {
            dialog: false,
            loading: false,
            selectFornecedor: null,
            fornecedores: [],
        };
    },
    watch: {
        dialog(val) {
            // Resetar selectFornecedor quando fechar o diálogo
            if (!val) {
                this.selectFornecedor = null;
            }
        }
    },
    async created() {
        await this.loadFornecedores();
    },
    methods: {
        openCreate() {
            this.selectFornecedor = null;
            this.dialog = true;
        },
        openEdit(fornecedor) {
            this.selectFornecedor = fornecedor;
            this.dialog = true;
        },
        openDelete(fornecedor) {
            this.selectFornecedor = fornecedor;
            this.$refs.confirmDialog.open('Excluir fornecedor', `Tem certeza que deseja excluir o fornecedor: ${fornecedor.nome_empresa}?`);
        },
        cancelDelete() {
            this.selectFornecedor = null;
        },
        async confirmDelete() {
            try {
                await FornecedorService.delete(this.selectFornecedor.id);
                await this.loadFornecedores();
                this.$refs.toast.success('Fornecedor excluído com sucesso');
            } catch (error) {
                const msg = error?.response?.data?.message || error?.message || 'Erro ao excluir fornecedor';
                this.$refs.toast.error(msg);
            }
        },
        async loadFornecedores() {
            try {
                this.fornecedores = await FornecedorService.list();
            } catch (error) {
                const msg = error?.response?.data?.message || error?.message || 'Erro ao carregar fornecedores';
                this.$refs.toast.error(msg);
            }
        },
        async handleSubmit(data) {
            this.loading = true;
            try {
                if (this.selectFornecedor) {
                    await FornecedorService.update(this.selectFornecedor.id, data);
                    this.$refs.toast.success('Fornecedor atualizado com sucesso');
                } else {
                    await FornecedorService.create(data);
                    this.$refs.toast.success('Fornecedor criado com sucesso');
                }
                this.dialog = false;
                await this.loadFornecedores();
            } catch (error) {
                const msg = error?.response?.data?.message || error?.message || 'Erro ao salvar fornecedor';
                this.$refs.toast.error(msg);
            } finally {
                this.loading = false;
            }
        }
    }
}
</script>
