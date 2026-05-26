<template>
    <v-row class="mb-4" dense>
        <v-col cols="12" sm="3">
            <v-select
                v-model="filter.tipo"
                :items="tipos"
                item-title="text"
                item-value="value"
                label="Tipo de Transação"
                variant="outlined"
                density="compact"
                clearable
                hide-details
                @update:model-value="applyFilter"
            />
        </v-col>
        <v-col cols="12" sm="3">
            <v-select
                v-model="filter.produtoId"
                :items="produtos"
                item-title="name"
                item-value="id"
                label="Produto"
                variant="outlined"
                density="compact"
                clearable
                hide-details
                @update:model-value="applyFilter"
            />
        </v-col>
        <v-col v-if="isAdmin" cols="12" sm="3">
            <v-select
                v-model="filter.funcionarioId"
                :items="funcionarios"
                item-title="name"
                item-value="id"
                label="Funcionário"
                variant="outlined"
                density="compact"
                clearable
                hide-details
                @update:model-value="applyFilter"
            />
        </v-col>
        <v-col cols="12" sm="3">
            <v-text-field
                v-model="filter.quantidade"
                label="Quantidade"
                type="number"
                variant="outlined"
                density="compact"
                clearable
                hide-details
                @update:model-value="applyFilter"
            />
        </v-col>

        <v-col cols="12" sm="6">
            <v-text-field
                v-model="filter.dataInicio"
                label="Data Início"
                type="date"
                variant="outlined"
                density="compact"
                clearable
                hide-details
                @update:model-value="applyFilter"
            />
        </v-col>
        <v-col cols="12" sm="6">
            <v-text-field
                v-model="filter.dataFim"
                label="Data Fim"
                type="date"
                variant="outlined"
                density="compact"
                clearable
                hide-details
                @update:model-value="applyFilter"
            />
        </v-col>
    </v-row>
</template>

<script>
import { useTransacoesStore } from '@/stores/transcoes.store';
import { useAuthStore } from '@/stores/auth.store';
import { Format } from '@/scripts/utils/Format';
import { TransacaoEnum } from '@/scripts/utils/Enums';
import { ProdutoService } from '@/scripts/services/ProdutoService'
import { AdminFuncionarioService } from '@/scripts/services/FuncionarioService'

export default {
    name: 'TransacoesFilter',
    emits: ['filter'],
    data() {
        return {
            produtos: [],
            funcionarios: [],
            filter: {
                tipo: '',
                quantidade: '',
                dataInicio: '',
                dataFim: '',
                produtoId: null,
                funcionarioId: null,
            },
            tipos: Object.values(TransacaoEnum).map(value => ({
                text: Format.formatEnum(value),
                value: value
            })),
            useTransacoesStore: useTransacoesStore(),
            isAdmin: useAuthStore().isAdmin,
        };
    },
    async created() {
        this.filter = { ...this.useTransacoesStore.filter };

        const requests = [ProdutoService.list()];
        if (this.isAdmin) requests.push(AdminFuncionarioService.list());

        const [produtos, funcionarios] = await Promise.all(requests);

        this.produtos = produtos;
        this.funcionarios = funcionarios ?? [];
    },
    methods: {
        applyFilter() {
            this.useTransacoesStore.setFilter(this.filter);
        },
        formatEnum(value) {
            return Format.formatEnum(value);
        },
    }
}
</script>