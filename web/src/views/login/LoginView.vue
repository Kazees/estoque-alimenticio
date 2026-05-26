<template>
    <v-container fluid class="fill-height">
        <v-row justify="center" align="center" class="fill-height">
            <v-col cols="2" sm="8" md="4">
                <v-card elevation="4">
                    <v-card-title class="text-h5 text-center pa-4">Login</v-card-title>
                    <v-card-text>
                        <LoginForm />
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>    
</template>
    
<script>
import LoginForm from '@/components/login/LoginForm.vue';

export default {
    name: 'LoginView',
    components: {
        LoginForm
    }
}
</script>
