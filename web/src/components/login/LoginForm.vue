<template>
    <div>
        <v-form v-model="valid" @submit.prevent="login">
            <v-text-field
                v-model="email"
                label="Email"
                type="email"
                required
            ></v-text-field>
            <v-text-field
                v-model="password"
                label="Senha"
                type="password"
                required
            >
            </v-text-field>
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
        };
    },
    components: {
        ToastComponent
    },
    setup() {
        const authStore = useAuthStore();
        const router = useRouter();
        return { authStore, router };
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
