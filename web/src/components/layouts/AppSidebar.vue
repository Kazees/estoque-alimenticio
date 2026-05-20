<template>
    <v-list>
        <v-list-item prepend-icon="mdi-food" title="Produtos" to="/produto" />
        <v-list-item prepend-icon="mdi-package-variant" title="Lotes" to="/lote" />
        <v-list-item prepend-icon="mdi-cup-water" title="Fornecedores" to="/fornecedor" />
        <v-list-item prepend-icon="mdi-swap-horizontal" title="Transações" to="/transacao" />
        
        <template v-if="authStore.isAdmin">
            <v-divider class="my-2"/>
            
            <v-list-subheader>Administração</v-list-subheader>
            <v-list-item prepend-icon="mdi-account-multiple" title="Funcionários" to="/admin/funcionarios" />
            <v-list-item prepend-icon="mdi-package-variant-closed" title="Gestão de Produtos" to="/admin/produtos" />
        </template>
    </v-list>
</template>

<script>
import { useAuthStore } from '@/stores/auth.store';

export default {
    name: 'AppSidebar',
    setup() {
        const authStore = useAuthStore();
        return { authStore };
    }
}
</script>