<template>
    <v-row class="mb-4" dense>
        <v-col cols="12" sm="3">
            <v-text-field
                v-model="filter.name"
                label="Nome"
                prepend-inner-icon="mdi-magnify"
                variant="outlined"
                density="compact"
                clearable
                hide-details
                @update:model-value="applyFilter"
            />
        </v-col>
        <v-col cols="12" sm="3">
            <v-text-field
                v-model="filter.precoMin"
                label="Preço Mínimo"
                type="number"
                variant="outlined"
                density="compact"
                clearable
                min="0"
                @keydown="e => e.key === '-' && e.preventDefault()"
                hint="Baseado no preço de venda do lote"
                persistent-hint
                @update:model-value="applyFilter"
            />
        </v-col>
        <v-col cols="12" sm="3">
            <v-text-field
                v-model="filter.precoMax"
                label="Preço Máximo"
                type="number"
                variant="outlined"
                density="compact"
                clearable
                min="0"
                @keydown="e => e.key === '-' && e.preventDefault()"
                hint="Baseado no preço de venda do lote"
                persistent-hint
                @update:model-value="applyFilter"
            />
        </v-col>
        <v-col cols="12" sm="3">
            <v-select
                v-model="filter.active"
                :items="statusItems"
                label="Status"
                item-title="text"
                item-value="value"
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
import { useProdutoStore } from '@/stores/produto.store';

export default {
    name: 'ProdutoFilter',
    emits: ['filter'],
    data() {
        return {
            filter: {
                name: '',
                precoMin: '',
                precoMax: '',
                active: ''
            },
            statusItems: [
                { text: 'Ativo', value: true },
                { text: 'Inativo', value: false }
            ],
            useProdutoStore: useProdutoStore()
        };
    },
    async created() {
        this.filter = { ...this.useProdutoStore.filter };
    },
    methods: {
        applyFilter() {
            this.useProdutoStore.setFilter(this.filter);
        }
    }
}
</script>