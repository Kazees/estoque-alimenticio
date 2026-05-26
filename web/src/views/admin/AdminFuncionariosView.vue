<template>
    <v-container fluid>
        <ToastComponent ref="toast" />

        <div class="d-flex justify-space-between align-center mb-4">
            <span class="text-h5 font-weight-bold">Funcionários</span>
            <v-btn color="primary" prepend-icon="mdi-plus" @click="openCreate">Novo Funcionário</v-btn>
        </div>

        <FuncionarioList :funcionarios="funcionarios" @delete="openDelete" />
        <ConfirmComponent ref="confirmDialog" @confirm="confirmDelete" @cancel="cancelDelete"/>

        <v-dialog v-model="dialog" max-width="800px" scrollable>
            <v-card>
                <v-card-title class="d-flex justify-space-between align-center pa-4">
                    Adicionar Funcionário
                    <v-icon icon="mdi-close" @click="dialog = false" style="cursor: pointer" />
                </v-card-title>
                <v-divider />
                <v-card-text>
                    <FuncionarioForm @submit="handleCreate" :funcionario="selectFuncionario" :loading="loading" />
                </v-card-text>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
import ToastComponent from '@/components/feedback/ToastComponent.vue';
import ConfirmComponent from '@/components/feedback/ConfirmComponent.vue';
import FuncionarioForm from '@/components/funcionario/FuncionarioForm.vue';
import FuncionarioList from '@/components/funcionario/FuncionarioList.vue';
import { AdminFuncionarioService } from '@/scripts/services/FuncionarioService';

export default {
    name: 'AdminFuncionariosView',
    components: {
        ToastComponent,
        ConfirmComponent,
        FuncionarioForm,
        FuncionarioList
    },
    data() {
        return {
            dialog: false,
            loading: false,
            selectFuncionario: null,
            funcionarios: [],
        };
    },
    async created() {
        await this.loadFuncionarios();
    },
    methods: {
        openCreate() {
            this.selectFuncionario = null;
            this.dialog = true;
        },
        async handleCreate(data) {
            this.loading = true;

            try {
                await AdminFuncionarioService.create(data);
                await this.loadFuncionarios();
                this.dialog = false;
                this.$refs.toast.success('Funcionário criado com sucesso');
            }
            catch (error) {
                const msg = error?.response?.data?.message || error?.message || 'Erro ao salvar produto';
                this.$refs.toast.error(msg);
            }
            finally {
                this.loading = false;
            }
        },
        async loadFuncionarios() {
            try {
                const data = await AdminFuncionarioService.list();
                this.funcionarios = data;
            } catch (error) {
                const msg = error?.response?.data?.message || error?.message || 'Erro ao carregar funcionários';
                this.$refs.toast.error(msg);
            }
        },
        async confirmDelete() {
            try {
                await AdminFuncionarioService.delete(this.selectFuncionario.id);
                await this.loadFuncionarios();
                this.$refs.toast.success('Funcionário excluído com sucesso');
            } catch (error) {
                const msg = error?.response?.data?.message || error?.message || 'Erro ao excluir funcionário';
                this.$refs.toast.error(msg);
            }
        },
        openDelete(funcionario) {
            this.selectFuncionario = funcionario;
            this.$refs.confirmDialog.open('Excluir Funcionário', `Tem certeza que deseja excluir o Funcionário: ${funcionario.name}?`);
        },
        cancelDelete() {
            this.selectFuncionario = null;
        }
    }
}
</script>