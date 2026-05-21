<template>
    <v-container fluid>
        <ToastComponent ref="toast" />
        <div class="d-flex align-center justify-space-between align-center mb-4">
            <span class="text-h5 font-weight-bold">Meu Perfil</span>
        </div>
        <v-card>
            <v-card-text>
                <PerfilForm />
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
import ToastComponent from '@/components/feedback/ToastComponent.vue';
import PerfilForm from '@/components/funcionario/PerfilForm.vue';

export default {
    name: 'PerfilView',
    components: {
        PerfilForm,
        ToastComponent
    }
}
</script>