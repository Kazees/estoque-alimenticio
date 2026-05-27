<template>
    <div>
        <v-form v-model="valid" @submit.prevent="login">
            <div class="text-body-large text-medium-emphasis">Conta</div>
            <v-text-field
                density="compact"
                prepend-inner-icon="mdi-email-outline"
                variant="outlined"
                v-model="email"
                type="email"
                placeholder="Email"
                required
            />

            <div class="text-body-large text-medium-emphasis d-flex align-center justify-space-between">Senha</div>
            <v-text-field
                v-model="password"
                placeholder="Senha"
                required
                :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                :type="showPassword ? 'text' : 'password'"
                density="compact"
                prepend-inner-icon="mdi-lock-outline"
                variant="outlined"
                @click:append-inner="showPassword = !showPassword"
            />
            <v-btn color="primary" type='submit' :loading="authStore.loading">Entrar</v-btn>
        </v-form>        
        <ToastComponent ref="toast" />
    </div>
</template>

<script>
import ToastComponent from '@/components/feedback/ToastComponent.vue';
import { useAuthStore } from '@/stores/auth.store';
import { useRouter } from 'vue-router';

export default {
    name: 'LoginForm',
    data() {
        return {
            email: '',
            password: '',
            valid: false,
            authStore: useAuthStore(),
            router: useRouter(),
            showPassword: false
        };
    },
    components: {
        ToastComponent
    },
    methods: {
        async login() {
            if (!this.email || !this.password) {
                this.$refs.toast.error('Preencha todos os campos');
                return;
            }

            this.authStore.loading = true;
            try {
                await this.authStore.login(this.email, this.password, this.router);
            }
            catch (error) {
                const msg = error?.response?.data?.message || error?.message || 'Erro ao realizar login';
                this.$refs.toast.error(msg);
            }
            finally {
                this.authStore.loading = false;
            }
        }
    }
}
</script>
