<template>
    <v-app-bar app color="primary" dark>
        <v-app-bar-nav-icon @click="$emit('toggle-drawer')"></v-app-bar-nav-icon>
        <v-toolbar-title>Estoque Alimentício</v-toolbar-title>
        <template #append>
            <v-avatar color="grey darken-1" size="32">
                <v-icon dark icon="mdi-account-circle"></v-icon>
            </v-avatar>
            <v-spacer></v-spacer>
            <v-icon dark icon="mdi-logout" @click="logout"></v-icon>
        </template>
    </v-app-bar>
</template>

<script>
import { useAuthStore } from '@/stores/auth.store';
import { useRouter } from 'vue-router';

export default {
    name: 'AppNavbar',
    emits: ['toggle-drawer'],
    setup() {
        const authStore = useAuthStore();
        const router = useRouter();
        return { authStore, router };
    },

    methods: {
        logout() {
            this.authStore.logout(this.router);
        }
    }

}
</script>