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
                        v-model="form.codigo" 
                        label="Código *" 
                        required
                    />
                </v-col>
                <v-col cols="12" sm="6">
                    <v-select 
                        :rules="[v => !!v || 'Campo obrigatório']" 
                        v-model="form.categoria" 
                        required 
                        :items="categoria" 
                        item-title="text" 
                        item-value="value" 
                        label="Categoria *"
                    />
                </v-col>
                <v-col cols="12" sm="6">
                    <v-select 
                        :rules="[v => !!v || 'Campo obrigatório']" 
                        v-model="form.unidadeMedida" 
                        required 
                        :items="unidadeMedida" 
                        item-title="text" 
                        item-value="value" 
                        label="Unidade de Medida *"
                    />
                </v-col>
                <v-col cols="12" sm="6">
                    <v-select 
                        v-model="form.perecivel" 
                        :items="perecivel" 
                        item-title="text" 
                        item-value="value" 
                        label="Perecível"
                    />
                </v-col>
                <v-col cols="12">
                    <v-textarea 
                        v-model="form.descricao" 
                        :rules="[v => !!v || 'Campo obrigatório']" 
                        label="Descrição *"
                    />
                </v-col>
                <v-col cols="12">
                    <v-expansion-panels>
                        <v-expansion-panel title="Informações Nutricionais">
                            <v-expansion-panel-text>
                                <v-textarea 
                                    v-model="form.informacoesNutricionais.ingredientes" 
                                    clearable 
                                    rows="2" 
                                    row-height="20" 
                                    label="Ingredientes"
                                />
                                <v-textarea 
                                    v-model="form.informacoesNutricionais.alergenicos" 
                                    clearable 
                                    rows="1" 
                                    row-height="15" 
                                    label="Alergênicos"
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
import { CategoriaEnum, UnidadeMedidaEnum } from '@/scripts/utils/Enums';
import { Format } from '@/scripts/utils/Format';
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
                codigo: '',
                descricao: '',
                perecivel: false,
                categoria: null,
                informacoesNutricionais: {
                    ingredientes: '',
                    alergenicos: '',
                },
                unidadeMedida: null,
            },
            categoria: Object.values(CategoriaEnum).map(value => ({ 
                text: Format.formatEnum(value), 
                value: value
            })),
            unidadeMedida: Object.values(UnidadeMedidaEnum).map(value => ({ 
                text: Format.formatEnum(value), 
                value : value
            })),
            perecivel: [
                { text: 'Sim', value: true },
                { text: 'Não', value: false }
            ]
        };
    },
    watch: {
        produto: {
            immediate: true,
            handler(val) {
                if (val) this.form = {...val}; // se tiver valor (obj) popular os campos do produto para editar
                else this.resetForm(); // se for null (criar) resetar o formulário
            }
        }
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