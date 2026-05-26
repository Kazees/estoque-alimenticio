<template>
    <v-form ref="form">
        <ToastComponent ref="toast" />
        <v-container>
            <v-row>
                <v-col cols="12">
                    <v-text-field
                        v-model="form.nome_empresa"
                        label="Nome da Empresa *"
                        :rules="[v => !!v || 'Campo obrigatório']"
                    />
                </v-col>

                <v-col cols="12">
                    <span class="text-subtitle-2 text-medium-emphasis">Contato</span>
                </v-col>
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

                <v-col cols="12">
                    <span class="text-subtitle-2 text-medium-emphasis">Endereço</span>
                </v-col>
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
    name: 'FornecedorForm',
    components: { ToastComponent },
    emits: ['submit'],
    props: {
        fornecedor: {
            type: Object,
            default: null
        }
    },
    data() {
        return {
            estadoId: null,
            municipioId: null,
            estados: [],
            municipios: [],
            bairros: [],
            bairrosCarregados: false,
            form: {
                nome_empresa: '',
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
    watch: {
        fornecedor: {
            immediate: true,
            deep: true,
            async handler(val) {
                if (val && val.id) {
                    // Deep copy para evitar problemas de reatividade
                    this.form = JSON.parse(JSON.stringify(val));
                    this.estadoId = null;
                    this.municipioId = null;
                    this.municipios = [];
                    this.bairros = [];
                    this.bairrosCarregados = false;

                    // estadoId vem do municipio aninhado (não é coluna direta do endereco)
                    const estadoId = this.form.endereco?.municipio?.estadoId;
                    if (estadoId) {
                        this.estadoId = estadoId;
                        this.municipios = await EnderecoService.listMunicipios(estadoId);

                        if (this.form.endereco?.municipioId) {
                            this.municipioId = this.form.endereco.municipioId;
                            this.bairros = await EnderecoService.listBairros(this.form.endereco.municipioId);
                            this.bairrosCarregados = true;
                        }
                    }
                } else {
                    this.resetForm();
                }
            }
        }
    },
    async created() {
        this.estados = await EnderecoService.listEstados();
    },
    methods: {
        resetForm() {
            this.estadoId = null;
            this.municipioId = null;
            this.municipios = [];
            this.bairros = [];
            this.bairrosCarregados = false;
            this.form = {
                nome_empresa: '',
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
                    municipioId: null,
                    estadoId: null
                }
            };
        },
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
