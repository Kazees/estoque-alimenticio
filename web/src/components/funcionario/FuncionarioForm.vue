<template>
    <v-form ref="form">
        <ToastComponent ref="toast" />
        <v-container>
            <v-row>
                <v-col cols="12" sm="6">
                    <v-text-field 
                        :rules="[v => !!v || 'Campo obrigatório']" 
                        v-model="form.name" 
                        label="Nome *" 
                        required 
                    />
                </v-col>
                <v-col cols="12" sm="6">
                    <v-text-field 
                        :rules="[v => !!v || 'Campo obrigatório']" 
                        v-model="form.email" 
                        label="Email *" 
                        required 
                    />
                </v-col>
                <v-col cols="12" sm="6">
                    <v-text-field 
                        :rules="[v => !!v || 'Campo obrigatório']"
                        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="show1 ? 'text' : 'password'"
                        v-model="form.password" 
                        label="password *" 
                        required 
                    />
                </v-col>
                <v-col cols="12">
                    <v-expansion-panels>
                        <v-expansion-panel title="Contato">
                            <v-expansion-panel-text>
                                <v-text-field v-model="form.contato.codigo_pais" clearable label="Codigo Pais" type="number" required />
                                <v-text-field v-model="form.contato.ddd" clearable label="DDD" type="number" required />
                                <v-text-field v-model="form.contato.ddd" clearable label="DDD" type="number" required />
                            </v-expansion-panel-text>
                        </v-expansion-panel>
                    </v-expansion-panels>
                </v-col>
                <v-col cols="12">
                    <v-expansion-panels>
                        <v-expansion-panel title="Endereço">
                            <v-expansion-panel-text>
                                <v-text-field v-model="form.endereco.logradouro" clearable label="Logradouro *" required />
                                <v-text-field v-model="form.endereco.numero" clearable label="Numero *" type="number" required />
                                <v-text-field v-model="form.endereco.complemento" clearable label="Complemento" />
                                <v-text-field v-model="form.endereco.cep" clearable label="CEP *" type="number" required />

                                <v-select 
                                    v-model="estadoId" 
                                    :items="estados" 
                                    item-title="name" 
                                    item-value="id" 
                                    label="Estado *"
                                    required
                                    @update:model-value="onChangeEstado"
                                />

                                <v-select 
                                    v-model="municipioId" 
                                    :items="municipios" 
                                    item-title="name" 
                                    item-value="id" 
                                    label="Municipio *"
                                    :disabled="!estadoId"
                                    required
                                    @update:model-value="onChangeMunicipio"
                                />

                                <v-select 
                                    v-model="form.endereco.bairroId" 
                                    :items="bairros" 
                                    item-title="name" 
                                    item-value="id" 
                                    label="Bairro *"
                                    :disabled="!municipioId"
                                    required
                                    @update:model-value="onChangeBairro"
                                />
                            </v-expansion-panel-text>
                        </v-expansion-panel>
                    </v-expansion-panels>
                </v-col>
            </v-row>
        </v-container>
        <v-card-actions class="justify-center">
            <v-btn color="primary" variant="elevated" @click="handleSubmit">Salvar</v-btn>
        </v-card-actions>
    </v-form>
</template>

<script>
import ToastComponent from '@/components/feedback/ToastComponent.vue';


export default {
    name: 'ProdutoForm',
    components: {
        ToastComponent
    },
    emits: ['submit'],
    props: {
        produto: {
            type: Object,
            default: null
        }
    },
    data() {
        return {
            form: {
                name: '',
                email: '',
                password: '',
            },
        };
    },
    methods: {
        resetForm() {
            this.form = {
                name: '',
                codigo: '',
                descricao: '',
                perecivel: false,
                categoria: null,
                informacoesNutricionais: {
                    ingredientes: '',
                    alergenicos: '',
                },
                unidadeMedida: null,
            };
        },
        async handleSubmit() {
            const {valid} = await this.$refs.form.validate();
            if (!valid) {
                this.$refs.toast.error('Preencha todos os campos obrigatórios');
                return;
            }

            const data = {...this.form};
            if (!data.informacoesNutricionais || (!data.informacoesNutricionais.ingredientes && !data.informacoesNutricionais.alergenicos)) data.informacoesNutricionais = null;

            this.$emit('submit', data);
        }
    }
}
</script>