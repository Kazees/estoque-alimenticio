<template>
    <v-app>
        <AppNavbar @toggle-drawer="isDrawerOpen = !isDrawerOpen" />
        <v-navigation-drawer v-model="isDrawerOpen" app>
            <AppSidebar />
        </v-navigation-drawer>
    
        <v-main>
            <router-view />
        </v-main>
    </v-app>
</template>

<script>
import AppNavbar from '@/components/layouts/AppNavbar.vue';
import AppSidebar from '@/components/layouts/AppSidebar.vue';

export default {
    name: 'AppLayout',
    components: {
        AppSidebar,
        AppNavbar
    },
    data() {
        return {
            isDrawerOpen: false
        }
    }
}
</script>