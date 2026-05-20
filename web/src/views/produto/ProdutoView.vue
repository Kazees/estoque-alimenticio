<template>
    <v-container>
        <ToastComponent ref="toast" />
        <ProdutoFilter @filter="handleFilter" />
        <v-btn color="primary" class="mb-4" @click="openCreate">Novo Produto</v-btn>
        <ProdutoList :produtos="produtos" @edit="openEdit" @delete="openDelete" />
        <v-dialog v-model="dialog" max-width="800px" scolla>
            <v-card>
                <v-card-title class="d-flex justify-space-between align-center">
                    {{ selectProduto ? 'Editar Produto' : 'Criar Produto' }}
                    <v-icon icon="mdi-close" class="ma-2" @click="dialog = false" style="cursor: pointer" />
                </v-card-title>
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

export default {
    name: 'ProdutoView',
    components: {
        ProdutoForm,
        ToastComponent,
        ProdutoList,
        ProdutoFilter
    },
    data() {
        return {
            dialog: false,
            loading: false,
            selectProduto: null, // null = criar, objeto = editar
            produtos: []
        };
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
        openDelete(produto) {
            // implementar lógica de exclusão
        },
        async loadProdutos() {
            try {
                this.produtos = await ProdutoService.list();
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
        }
    }
}
</script>