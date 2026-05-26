<template>
    <v-app-bar>
        <v-app-bar-nav-icon @click="$emit('toggle-drawer')"></v-app-bar-nav-icon>
        <v-toolbar-title>Estoque Alimentício</v-toolbar-title>
        <template #append>
            <v-menu min-width="200px">
                <template v-slot:activator="{ props }">
                <v-btn icon v-bind="props">
                    <v-avatar color="white" size='32'>
                        <span class="text-headline-small"> {{ initials }} </span>
                    </v-avatar>
                </v-btn>
                </template>
                <v-card>
                    <v-card-text>
                        <div class="mx-auto text-center">
                            <v-avatar color="white">
                                <span class="text-headline-small"> {{ initials }} </span>
                            </v-avatar>
                            <h3 class="my-0"> {{ authStore.user?.name }} </h3>
                            <p class="text-body-small mt-1"> {{ authStore.user?.email }} </p>

                            <v-divider class="my-3"></v-divider>
                            <v-btn variant="text" rounded to="/perfil">
                                Meu Perfil
                            </v-btn>
                            <v-divider class="my-3"></v-divider>
                            <v-btn variant="text" rounded @click="logout">
                                Sair
                            </v-btn>
                        </div>
                    </v-card-text>
                </v-card>
            </v-menu>
        </template>
    </v-app-bar>
</template>

<script>
import { useAuthStore } from '@/stores/auth.store';
import { useRouter } from 'vue-router';

export default {
    name: 'AppNavbar',
    emits: ['toggle-drawer'],
    data() {
        return {
            authStore: useAuthStore(),
            router: useRouter()
        };
    },
    computed: {
        initials() {
            const name = this.authStore.user?.name;
            return name ? name.split(' ').map(n => n[0]).join('') : '';
        }
    },
    methods: {
        logout() {
            this.authStore.logout(this.router);
        }
    }

}
</script>