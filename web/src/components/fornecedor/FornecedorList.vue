<template>
    <v-card border>
        <v-card-title class="d-flex justify-space-between align-center pa-4">
            Fornecedores Cadastrados
        </v-card-title>
        <v-divider />

        <v-data-table
            :headers="visibleHeaders"
            :items="fornecedores"
            :loading="loading"
            class="elevation-1"
        >

        <template v-slot:[`item.actions`]="{ item }">
            <v-card class="d-flex justify-right" flat >
                <v-btn icon size="30" @click="$emit('view', item)">
                    <v-icon>mdi-information</v-icon>
                </v-btn>
                <v-btn icon color="error" @click="$emit('delete', item)" size='30' v-if="authStore.isAdmin">
                    <v-icon>mdi-delete</v-icon>
                </v-btn>
                <v-btn icon color="info" @click="$emit('edit', item)" size='30' v-if="authStore.isAdmin">
                    <v-icon>mdi-pencil</v-icon>
                </v-btn>
            </v-card>
        </template>
        </v-data-table>
    </v-card>
</template>

<script>
import { useAuthStore } from '@/stores/auth.store';

export default {
    name: 'FornecedorList',
    props: {
        fornecedores: {
            type: Array,
            default: () => []
        },
        loading: {
            type: Boolean,
            default: false
        }
    },
    emits: ['delete', 'edit', 'view'],
    data() {
        return {
            authStore: useAuthStore(),
            headers: [
                { title: 'Nome', key: 'nome_empresa' },
                { title: 'CEP', key: 'endereco.cep' },
                { title: 'Contato', key: 'contato.numero' },
                { title: 'Ações', key: 'actions', sortable: false }
            ]
        }
    },
    computed: {
        visibleHeaders() {
            return this.headers;
        }
    },
}
</script>