<template>
    <div>
        <ToastComponent ref="toast" />
        <v-card border>
            <div class="d-flex align-center pa-6 pb-4">
                <v-avatar color="black" size="64">
                    <span class="text-h6 text-white">{{ initials }}</span>
                </v-avatar>
                <div class="ml-4">
                    <div class="text-h6 font-weight-bold">{{ form.name }}</div>
                    <div class="text-body-2 text-medium-emphasis">{{ formatEnum(form.role) }}</div>
                </div>
            </div>
            <v-divider />
            <v-form ref="formRef" class="pa-6">
                <div class="text-subtitle-2 font-weight-bold mb-3">Informações Pessoais</div>
                <v-row dense>
                    <v-col cols="12" md="6">
                        <v-text-field v-model="form.name" label="Nome" variant="outlined" density="compact" />
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field v-model="form.email" label="E-mail" variant="outlined" density="compact" />
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field :model-value="formatEnum(form.role)" label="Cargo" variant="outlined" density="compact" disabled />
                    </v-col>
                </v-row>
                <v-divider class="my-4" />
                <div class="text-subtitle-2 font-weight-bold mb-3">Contato</div>
                <v-row dense>
                    <v-col cols="12" md="2">
                        <v-text-field v-model="form.contato.ddd" label="DDD" variant="outlined" density="compact" />
                    </v-col>
                    <v-col cols="12" md="4">
                        <v-text-field v-model="form.contato.numero" label="Telefone" variant="outlined" density="compact" />
                    </v-col>
                </v-row>
                <v-divider class="my-4" />
                <div class="text-subtitle-2 font-weight-bold mb-3">Endereço</div>
                <v-row dense>
                    <v-col cols="12" md="3">
                        <v-text-field v-model="form.endereco.cep" label="CEP" variant="outlined" density="compact" />
                    </v-col>
                    <v-col cols="12" md="7">
                        <v-text-field v-model="form.endereco.logradouro" label="Logradouro" variant="outlined" density="compact" />
                    </v-col>
                    <v-col cols="12" md="2">
                        <v-text-field v-model="form.endereco.numero" label="N°" variant="outlined" density="compact" />
                    </v-col>
                    <v-col v-if="form.endereco?.bairro?.name" cols="12" md="4">
                        <v-text-field :model-value="form.endereco?.bairro?.name" label="Bairro" variant="outlined" density="compact" disabled />
                    </v-col>
                    <v-col cols="12" md="5">
                        <v-text-field :model-value="form.endereco?.municipio?.name || form.endereco?.bairro?.municipio?.name" label="Cidade" variant="outlined" density="compact" disabled />
                    </v-col>
                    <v-col cols="12" md="3">
                        <v-text-field :model-value="form.endereco?.municipio?.estado?.name || form.endereco?.bairro?.municipio?.estado?.name" label="Estado" variant="outlined" density="compact" disabled />
                    </v-col>
                </v-row>
            </v-form>
            <v-divider />
            <div class="d-flex justify-end pa-4">
                <v-btn color="primary" variant="elevated" :loading="loading" @click="handleSubmit">Salvar</v-btn>
            </div>
        </v-card>
    </div>
</template>

<script>
import { useAuthStore } from '@/stores/auth.store';
import ToastComponent from '@/components/feedback/ToastComponent.vue';
import { FuncionarioService } from '@/scripts/services/FuncionarioService';
import { Format } from '@/scripts/utils/Format';

export default {
    name: 'PerfilForm',
    components: { ToastComponent },
    data() {
        return {
            authStore: useAuthStore(),
            loading: false,
            form: {
                name: '',
                email: '',
                role: '',
                contato: { ddd: '', numero: '' },
                endereco: { cep: '', logradouro: '', numero: '', bairro: null, bairroId: null }
            }
        };
    },
    computed: {
        initials() {
            const name = this.form.name;
            return name ? name.split(' ').map(n => n[0]).join('').toUpperCase() : '';
        }
    },
    beforeUnmount() {
        this.form = {
            name: '', email: '', role: '',
            contato: { ddd: '', numero: '' },
            endereco: { cep: '', logradouro: '', numero: '', bairro: null, bairroId: null }
        }
    },
    async created() {
        if (this.authStore.user) {
            this.form.name = this.authStore.user.name;
            this.form.email = this.authStore.user.email;
            this.form.role = this.authStore.user.role;
        }
        try {
            const data = await FuncionarioService.me();
            this.form.name = data.name;
            this.form.email = data.email;
            this.form.role = data.role;
            this.form.contato = data.contato;
            this.form.endereco = data.endereco;
        } catch (error) {
            const msg = error?.response?.data?.message || error?.message || 'Erro ao carregar perfil';
            this.$refs.toast.error(msg);
        }
    },
    methods: {
        formatEnum(value) { return Format.formatEnum(value); },
        async handleSubmit() {
            const { valid } = await this.$refs.formRef.validate();
            this.loading = true;
            try {
                const data = await FuncionarioService.update(this.form);
                this.authStore.user.name = data.name;
                this.authStore.user.email = data.email;
                this.$refs.toast.success('Perfil atualizado com sucesso');
            } catch (error) {
                const msg = error?.response?.data?.message || error?.message || 'Erro ao atualizar perfil';
                this.$refs.toast.error(msg);
            } finally {
                this.loading = false;
            }
        }
    }
}
</script>