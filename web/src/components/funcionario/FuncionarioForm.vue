<template>
    <v-form ref="form">
        <ToastComponent ref="toast" />
        <v-container>
            <v-row>
                <v-col cols="12" sm="6">
                    <v-text-field
                        v-model="form.name"
                        label="Nome *"
                        :rules="[v => !!v || 'Campo obrigatório']"
                    />
                </v-col>
                <v-col cols="12" sm="6">
                    <v-text-field
                        v-model="form.email"
                        label="Email *"
                        type="email"
                        :rules="[v => !!v || 'Campo obrigatório']"
                    />
                </v-col>
                <v-col cols="12" sm="12">
                    <v-text-field
                        v-model="form.password"
                        label="Senha *"
                        :type="showPassword ? 'text' : 'password'"
                        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                        :rules="[v => !!v || 'Campo obrigatório']"
                        @click:append="showPassword = !showPassword"
                    />
                </v-col>

                <v-col cols="12">
                    <v-expansion-panels>
                        <v-expansion-panel title="Contato">
                            <v-expansion-panel-text>
                                <v-row>
                                    <v-col cols="12" sm="3">
                                        <v-text-field
                                            v-model="form.contato.codigo_pais"
                                            label="Código País *"
                                            type="number"
                                            clearable
                                            :rules="[v => !!v || 'Campo obrigatório']"
                                        />
                                    </v-col>
                                    <v-col cols="12" sm="3">
                                        <v-text-field
                                            v-model="form.contato.ddd"
                                            label="DDD *"
                                            type="number"
                                            clearable
                                            :rules="[v => !!v || 'Campo obrigatório']"
                                        />
                                    </v-col>
                                    <v-col cols="12" sm="6">
                                        <v-text-field
                                            v-model="form.contato.numero"
                                            label="Número *"
                                            type="number"
                                            clearable
                                            :rules="[v => !!v || 'Campo obrigatório']"
                                        />
                                    </v-col>
                                </v-row>
                            </v-expansion-panel-text>
                        </v-expansion-panel>
                    </v-expansion-panels>
                </v-col>

                <v-col cols="12">
                    <v-expansion-panels>
                        <v-expansion-panel title="Endereço">
                            <v-expansion-panel-text>
                                <v-row>
                                    <v-col cols="12" sm="8">
                                        <v-text-field
                                            v-model="form.endereco.logradouro"
                                            label="Logradouro *"
                                            clearable
                                            :rules="[v => !!v || 'Campo obrigatório']"
                                        />
                                    </v-col>
                                    <v-col cols="12" sm="4">
                                        <v-text-field
                                            v-model="form.endereco.numero"
                                            label="Número *"
                                            type="number"
                                            clearable
                                            :rules="[v => !!v || 'Campo obrigatório']"
                                        />
                                    </v-col>
                                    <v-col cols="12" sm="6">
                                        <v-text-field
                                            v-model="form.endereco.complemento"
                                            label="Complemento"
                                            clearable
                                        />
                                    </v-col>
                                    <v-col cols="12" sm="6">
                                        <v-text-field
                                            v-model="form.endereco.cep"
                                            label="CEP *"
                                            type="number"
                                            clearable
                                            :rules="[v => !!v || 'Campo obrigatório']"
                                        />
                                    </v-col>
                                    <v-col cols="12" sm="6">
                                        <v-select
                                            v-model="estadoId"
                                            :items="estados"
                                            item-title="name"
                                            item-value="id"
                                            label="Estado *"
                                            clearable
                                            :rules="[v => !!v || 'Campo obrigatório']"
                                            @update:model-value="onChangeEstado"
                                        />
                                    </v-col>
                                    <v-col cols="12" sm="6">
                                        <v-select
                                            v-model="municipioId"
                                            :items="municipios"
                                            item-title="name"
                                            item-value="id"
                                            label="Município *"
                                            clearable
                                            :disabled="!estadoId"
                                            :rules="[v => !!v || 'Campo obrigatório']"
                                            @update:model-value="onChangeMunicipio"
                                        />
                                    </v-col>
                                    <v-col v-if="bairros.length > 0 || (municipioId && bairrosCarregados)" cols="12">
                                        <v-select
                                            v-model="form.endereco.bairroId"
                                            :items="bairros"
                                            item-title="name"
                                            item-value="id"
                                            :label="bairros.length > 0 ? 'Bairro *' : 'Bairro'"
                                            clearable
                                            :disabled="!municipioId"
                                            :hint="bairros.length === 0 ? 'Nenhum bairro cadastrado para este município' : ''"
                                            persistent-hint
                                            :rules="bairros.length > 0 ? [v => !!v || 'Campo obrigatório'] : []"
                                        />
                                    </v-col>
                                </v-row>
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
import { EnderecoService } from '@/scripts/services/EnderecoService';

export default {
    name: 'FuncionarioForm',
    components: { ToastComponent },
    emits: ['submit'],
    props: {
        funcionario: {
            type: Object,
            default: null
        }
    },
    data() {
        return {
            showPassword: false,
            estadoId: null,
            municipioId: null,
            estados: [],
            municipios: [],
            bairros: [],
            bairrosCarregados: false,
            form: {
                name: '',
                email: '',
                password: '',
                contato: {
                    codigo_pais: '',
                    ddd: '',
                    numero: ''
                },
                endereco: {
                    cep: '',
                    logradouro: '',
                    numero: '',
                    complemento: '',
                    bairroId: null,
                    municipioId: null
                }
            }
        };
    },
    async created() {
        this.estados = await EnderecoService.listEstados();
    },
    methods: {
        async onChangeEstado(estadoId) {
            this.municipioId = null;
            this.form.endereco.bairroId = null;
            this.municipios = [];
            this.bairros = [];
            this.bairrosCarregados = false;
            if (!estadoId) return;
            this.municipios = await EnderecoService.listMunicipios(estadoId);
        },
        async onChangeMunicipio(municipioId) {
            this.form.endereco.bairroId = null;
            this.form.endereco.municipioId = municipioId ?? null;
            this.bairros = [];
            this.bairrosCarregados = false;
            if (!municipioId) return;
            this.bairros = await EnderecoService.listBairros(municipioId);
            this.bairrosCarregados = true;
        },
        async handleSubmit() {
            const { valid } = await this.$refs.form.validate();
            if (!valid) {
                this.$refs.toast.error('Preencha todos os campos obrigatórios');
                return;
            }
            this.$emit('submit', { ...this.form });
        }
    }
}
</script>
