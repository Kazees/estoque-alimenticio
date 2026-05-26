<template>
    <v-card border>
        <v-card-title class="d-flex justify-space-between align-center pa-4">
            Produtos Cadastrados
        </v-card-title>
        <v-divider />

        <v-data-table
            :headers="headers"
            :items="produtos"
            :loading="loading"
            class="elevation-1"
        >
        <template v-slot:[`item.categoria`]="{ item }">
            {{  formatEnum(item.categoria)  }}
        </template>

        <template v-slot:[`item.unidadeMedida`]="{ item }">
            {{ formatEnum(item.unidadeMedida) }}
        </template>

        <template v-slot:[`item.perecivel`]="{ item }">
            <v-chip :color="item.perecivel ? 'success' : 'error'" size="small">
                {{ item.perecivel ? 'Sim' : 'Não' }}
            </v-chip>
        </template>

        <template v-slot:[`item.actions`]="{ item }">
            <v-card class="d-flex justify-right" flat >
                <v-btn icon color="primary" @click="$emit('edit', item)" size='30' v-if="authStore.isAdmin">
                    <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn icon color="error" @click="$emit('delete', item)" size='30' v-if="authStore.isAdmin">
                    <v-icon>mdi-delete</v-icon>
                </v-btn>
            </v-card>
        </template>
        </v-data-table>
    </v-card>
</template>

<script>
import { Format } from '@/scripts/utils/Format';
import { useAuthStore } from '@/stores/auth.store';

export default {
    name: 'ProdutoList',
    props: {
        produtos: {
            type: Array,
            default: () => []
        },
        loading: {
            type: Boolean,
            default: false
        }
    },
    emits: ['edit', 'delete'],
    data() {
        return {
            authStore: useAuthStore(),
            headers: [
                { title: 'Nome', key: 'name' },
                { title: 'Código', key: 'codigo' },
                { title: 'Descrição', key: 'descricao' },
                { title: 'Perecível', key: 'perecivel' },
                { title: 'Categoria', key: 'categoria' },
                { title: 'Unidade de Medida', key: 'unidadeMedida' },
                { title: 'Cadastrado', key: 'cadastrado_funcionario.name' },
                { title: 'Ações', key: 'actions', sortable: false }
            ]
        }
    },
    methods: {
        formatEnum(value) {
            return Format.formatEnum(value);
        },
    }
}
</script>