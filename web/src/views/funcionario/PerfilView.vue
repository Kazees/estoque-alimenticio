<template>
    <v-container fluid>
        <div class="d-flex align-center mb-4">
            <v-btn icon variant="text" @click="$router.back()">
                <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
            <span class="text-h5 font-weight-bold ml-2">Meu Perfil</span>
        </div>
        <PerfilForm />
    </v-container>
</template>

<script>
import PerfilForm from '@/components/funcionario/PerfilForm.vue';

export default {
    name: 'PerfilView',
    components: { PerfilForm }
}
</script>
