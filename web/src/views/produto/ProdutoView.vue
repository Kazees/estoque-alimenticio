<template>
    <v-container fluid>
        <ToastComponent ref="toast" />

        <div class="d-flex justify-space-between align-center mb-4">
            <span class="text-h5 font-weight-bold">Produtos</span>
            <v-btn color="primary" prepend-icon="mdi-plus" @click="openCreate">Novo Produto</v-btn>
        </div>

        <ProdutoCriticos :produtos="useProdutoStore.produtos"/>
        <ProdutoFilter />
        <ProdutoList :produtos="useProdutoStore.produtos" @edit="openEdit" @delete="openDelete" />
        <ConfirmComponent ref="confirmDialog" @confirm="confirmDelete" @cancel="cancelDelete"/>

        <v-dialog v-model="dialog" max-width="800px" scrollable>
            <v-card>
                <v-card-title class="d-flex justify-space-between align-center pa-4">
                    {{ selectProduto ? 'Editar Produto' : 'Criar Produto' }}
                    <v-icon icon="mdi-close" @click="dialog = false" style="cursor: pointer" />
                </v-card-title>
                <v-divider />
                <v-card-text>
                    <ProdutoForm @submit="handleCreate" :produto="selectProduto" :loading="loading" />
                </v-card-text>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
import ProdutoForm from '@/components/produto/ProdutoForm.vue';
import ToastComponent from '@/components/feedback/ToastComponent.vue';
import ProdutoList from '@/components/produto/ProdutoList.vue';
import ProdutoFilter from '@/components/produto/ProdutoFilter.vue';
import { ProdutoService } from '@/scripts/services/ProdutoService';
import { useProdutoStore } from '@/stores/produto.store';
import ConfirmComponent from '@/components/feedback/ConfirmComponent.vue';
import ProdutoCriticos from '@/components/produto/ProdutoCriticos.vue';

export default {
    name: 'ProdutoView',
    components: {
        ProdutoForm,
        ToastComponent,
        ProdutoList,
        ProdutoFilter,
        ConfirmComponent,
        ProdutoCriticos
    },
    data() {
        return {
            dialog: false,
            loading: false,
            selectProduto: null, // null = criar, objeto = editar
            produtos: [],
            useProdutoStore: useProdutoStore()
        };
    },
    async created() {
        await this.useProdutoStore.list();
    },
    methods: {
        openCreate() {
            this.selectProduto = null;
            this.dialog = true;
        },
        openEdit(produto) {
            this.selectProduto = produto;
            this.dialog = true;
        },
        async loadProdutos() {
            try {
                await this.useProdutoStore.list();
            }
            catch (error) {
                const msg = error?.response?.data?.message || error?.message || 'Erro ao carregar produtos';
                this.$refs.toast.error(msg);
            }
        },
        async handleCreate(data) {
            this.loading = true;

            try {
                if (this.selectProduto) {
                    await ProdutoService.update(this.selectProduto.id, data);
                    this.$refs.toast.success('Produto atualizado com sucesso');
                }
                else {
                    await ProdutoService.save(data);
                    this.$refs.toast.success('Produto criado com sucesso');
                }

                this.dialog = false;
                await this.loadProdutos();
            }
            catch (error) {
                const msg = error?.response?.data?.message || error?.message || 'Erro ao salvar produto';
                this.$refs.toast.error(msg);
            }
            finally {
                this.loading = false;
            }
        },
        openDelete(produto) {
            this.selectProduto = produto;
            this.$refs.confirmDialog.open('Excluir produto', `Tem certeza que deseja excluir o produto: ${produto.name}?`);
        },
        async confirmDelete() {
            try {
                await ProdutoService.delete(this.selectProduto.id);
                await this.loadProdutos();
                this.$refs.toast.success('Produto excluído com sucesso');

            } catch (error) {
                const msg = error?.response?.data?.message || error?.message || 'Erro ao excluir produto';
                this.$refs.toast.error(msg);
            }
        },
    }
}
</script>