<template>
    <v-container fluid class="d-flex flex-column align-center justify-center">
        <v-avatar color="black" size='80'>
          <span> {{ initials }} </span>
        </v-avatar>
        <v-row class="mt-4" justify="center">
            <v-col cols="12">
                <v-form ref="form">
                    <v-text-field v-model="authStore.user.name" label="Nome" required></v-text-field>
                    <v-text-field v-model="authStore.user.email" label="Email" type="email" required></v-text-field>
                </v-form>
            </v-col>
        </v-row>
    </v-container>       
</template>

<script>
import { useAuthStore } from '@/stores/auth.store';

export default {
  name: 'PerfilForm',
  data() {
    return {
      authStore: useAuthStore(),
    };
  },
  computed: {
    initials() {
        const name = this.authStore.user?.name;
        return name ? name.split(' ').map(n => n[0]).join('') : '';
    }
  },
}
</script>