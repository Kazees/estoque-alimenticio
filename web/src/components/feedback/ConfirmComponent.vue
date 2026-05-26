<template>
    <v-dialog
        v-model="show"
        max-width="400"
    >
        <v-card>
            <v-card-title class="text-h5 d-flex justify-space-between align-center">
                {{ title }}
                <v-icon icon="mdi-close" @click="cancel" style="cursor: pointer"/>
            </v-card-title>

            <v-card-text>
                {{ message }}
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="error"
                    variant="elevated"
                    @click="cancel"
                >
                    Cancelar
                </v-btn>
                <v-btn
                    color="green darken-1"
                    variant="elevated"
                    @click="confirm"
                >
                    Confirmar
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>

export default {
    name: 'ConfirmComponent',
    emits: ['confirm', 'cancel'],
    data() {
        return {
            show: false,
            title: 'Confirmar',
            message: 'Tem certeza?'
        }
    },
    methods: {
        open(title, message) {
            this.title = title
            this.message = message
            this.show = true
        },
        confirm() {
            this.show = false
            this.$emit('confirm')
        },
        cancel() {
            this.show = false
            this.$emit('cancel')
        }
    }
}
</script>