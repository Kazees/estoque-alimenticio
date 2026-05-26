<template>
    <v-card border>
        <v-card-title class="d-flex justify-space-between align-center pa-4">
            Funcionários Cadastrados
        </v-card-title>
        <v-divider />

        <v-data-table
            :headers="headers"
            :items="funcionarios"
            :loading="loading"
            class="elevation-1"
        >
        <template v-slot:[`item.role`]="{ item }">
            {{  formatEnum(item.role)  }}
        </template>

        <template v-slot:[`item.active`]="{ item }">
            <v-chip :color="item.active ? 'success' : 'error'" size="small">
                {{ item.active ? 'Ativo' : 'Inativo' }}
            </v-chip>
        </template>

        <template v-slot:[`item.actions`]="{ item }">
            <v-card class="d-flex justify-right" flat >
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
    name: 'FuncionarioList',
    props: {
        funcionarios: {
            type: Array,
            default: () => []
        },
        loading: {
            type: Boolean,
            default: false
        }
    },
    emits: ['delete'],
    data() {
        return {
            authStore: useAuthStore(),
            headers: [
                { title: 'Nome', key: 'name' },
                { title: 'Email', key: 'email' },
                { title: 'Cargo', key: 'role' },
                { title: 'Status', key: 'active' },
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