<template>
    <v-form ref="form">
        <ToastComponent ref="toast" />
        <v-container>
            <v-row>
                <v-col cols="12" sm="4">
                    <v-text-field
                        v-model="form.numero_lote"
                        label="Número do Lote *"
                        type="number"
                        :disabled="readOnly"
                        clearable
                        min="0"
                        @keydown="e => e.key === '-' && e.preventDefault()"
                        :rules="[v => !!v || 'Campo obrigatório']"
                    />
                </v-col>
                <v-col cols="12" sm="4">
                    <v-text-field
                        v-model="form.preco_custo"
                        label="Preço de Custo *"
                        prefix="R$"
                        type="number"
                        persistent-hint
                        min="0"
                        @keydown="e => e.key === '-' && e.preventDefault()"
                        :disabled="readOnly"
                        hint="Preço baseado no conjunto de produtos"
                        :rules="[v => !!v || 'Campo obrigatório']"
                    />
                </v-col>
                <v-col cols="12" sm="4">
                    <v-text-field
                        v-model="form.preco_venda"
                        label="Preço de Venda *"
                        prefix="R$"
                        type="number"
                        persistent-hint
                        min="0"
                        @keydown="e => e.key === '-' && e.preventDefault()"
                        :disabled="readOnly"
                        hint="Preço baseado no conjunto de produtos"
                        :rules="[v => !!v || 'Campo obrigatório']"
                    />
                </v-col>

                <v-col cols="12" sm="6">
                    <v-text-field
                        v-model="form.data_entrada"
                        label="Data de Entrada *"
                        type="date"
                        :disabled="readOnly"
                        :rules="[v => !!v || 'Campo obrigatório']"
                    />
                </v-col>
                <v-col cols="12" sm="6">
                    <v-text-field
                        v-model="form.data_validade"
                        label="Data de Validade *"
                        type="date"
                        :disabled="readOnly"
                        :rules="[v => !!v || 'Campo obrigatório']"
                    />
                </v-col>

                <v-col cols="12" sm="6">
                    <v-select
                        v-model="form.produtoId"
                        :items="produtos"
                        item-title="name"
                        item-value="id"
                        label="Produto *"
                        :disabled="readOnly"
                        :rules="[v => !!v || 'Campo obrigatório']"
                    />
                </v-col>
                <v-col cols="12" sm="6">
                    <v-text-field
                        v-model="form.quantidade"
                        label="Quantidade *"
                        type="number"
                        min="0"
                        @keydown="e => e.key === '-' && e.preventDefault()"
                        :disabled="readOnly"
                        :rules="[v => !!v || 'Campo obrigatório']"
                    />
                </v-col>

                <v-col cols="12" sm="6">
                    <v-select
                        v-model="form.fornecedorId"
                        :items="fornecedores"
                        item-title="nome_empresa"
                        item-value="id"
                        :disabled="readOnly"
                        label="Fornecedor *"
                        :rules="[v => !!v || 'Campo obrigatório']"
                    />
                </v-col>
                <v-col cols="12" sm="6">
                    <v-select
                        v-model="form.localizacaoId"
                        :items="localizacoes"
                        :item-title="item => `${item.corredores} - ${item.prateleiras} - ${item.seccoes}`"
                        item-value="id"
                        label="Localização *"
                        :disabled="readOnly"
                        :rules="[v => !!v || 'Campo obrigatório']"
                    />
                </v-col>
            </v-row>

            <v-divider class="my-4" v-if="produtoSelecionado" />
            <v-row v-if="produtoSelecionado">
                <v-col cols="12">
                    <v-card elevation="2" class="pa-4">
                        <v-card-title class="text-h6">Detalhes do Produto</v-card-title>
                        <v-divider class="my-2" />
                        
                        <v-row>
                            <v-col cols="12" sm="6">
                                <strong>Nome:</strong> {{ produtoSelecionado.name }}
                            </v-col>
                            <v-col cols="12" sm="6">
                                <strong>Código:</strong> {{ produtoSelecionado.codigo }}
                            </v-col>
                            <v-col cols="12">
                                <strong>Descrição:</strong> {{ produtoSelecionado.descricao }}
                            </v-col>
                            <v-col cols="12" sm="6">
                                <strong>Categoria:</strong> {{ produtoSelecionado.categoria }}
                            </v-col>
                            <v-col cols="12" sm="6">
                                <strong>Perecível:</strong> 
                                <v-chip :color="produtoSelecionado.perecivel ? 'red' : 'green'" text-color="white" size="small">
                                    {{ produtoSelecionado.perecivel ? 'Sim' : 'Não' }}
                                </v-chip>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <strong>Unidade de Medida:</strong> {{ produtoSelecionado.unidadeMedida }}
                            </v-col>
                        </v-row>
                    </v-card>
                </v-col>
            </v-row>

            <v-divider class="my-4" v-if="fornecedorSelecionado" />
            <v-row v-if="fornecedorSelecionado">
                <v-col cols="12">
                    <v-card elevation="2" class="pa-4">
                        <v-card-title class="text-h6">Detalhes do Fornecedor</v-card-title>
                        <v-divider class="my-2" />
                        
                        <v-row>
                            <v-col cols="12" sm="6">
                                <strong>Empresa:</strong> {{ fornecedorSelecionado.nome_empresa }}
                            </v-col>
                            <v-col cols="12" sm="6">
                                <strong>DDD:</strong> {{ fornecedorSelecionado.contato?.ddd }}
                            </v-col>
                            <v-col cols="12" sm="6">
                                <strong>Telefone:</strong> {{ fornecedorSelecionado.contato?.numero }}
                            </v-col>
                            <v-col cols="12" v-if="fornecedorSelecionado.endereco">
                                <strong>Endereço:</strong> {{ Format.toAddress(fornecedorSelecionado.endereco) }}
                            </v-col>
                        </v-row>
                    </v-card>
                </v-col>
            </v-row>

            <v-divider class="my-4" v-if="localizacaoSelecionada" />
            <v-row v-if="localizacaoSelecionada">
                <v-col cols="12">
                    <v-card elevation="2" class="pa-4">
                        <v-card-title class="text-h6">Detalhes da Localização</v-card-title>
                        <v-divider class="my-2" />
                        
                        <v-row>
                            <v-col cols="12" sm="4">
                                <strong>Corredor:</strong> {{ localizacaoSelecionada.corredores }}
                            </v-col>
                            <v-col cols="12" sm="4">
                                <strong>Prateleira:</strong> {{ localizacaoSelecionada.prateleiras }}
                            </v-col>
                            <v-col cols="12" sm="4">
                                <strong>Seção:</strong> {{ localizacaoSelecionada.seccoes }}
                            </v-col>
                        </v-row>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>

        <v-card-actions class="justify-center" v-if="!readOnly">
            <v-btn color="primary" variant="elevated" @click="handleSubmit">Salvar</v-btn>
        </v-card-actions>
    </v-form>
</template>

<script>
import ToastComponent from '@/components/feedback/ToastComponent.vue';
import { ProdutoService } from '@/scripts/services/ProdutoService';
import { FornecedorService } from '@/scripts/services/FornecedorService';
import { LoteService } from '@/scripts/services/LoteService';
import { Format } from '@/scripts/utils/Format';

export default {
    name: 'LoteForm',
    components: { ToastComponent },
    emits: ['submit'],
    props: {
        lote: {
            type: Object,
            default: null
        },
        readOnly: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            Format,
            produtos: [],
            fornecedores: [],
            localizacoes: [],
            produtoSelecionado: null,
            fornecedorSelecionado: null,
            localizacaoSelecionada: null,
            form: {
                numero_lote: '',
                preco_custo: '',
                preco_venda: '',
                produtoId: null,
                quantidade: '',
                fornecedorId: null,
                localizacaoId: null,
                data_entrada: '',
                data_validade: ''
            }
        };
    },
    async created() {
        const [produtos, fornecedores, localizacoes] = await Promise.all([
            ProdutoService.list(),
            FornecedorService.list(),
            LoteService.listLocalizacao()
        ]);
        this.produtos = produtos;
        this.fornecedores = fornecedores;
        this.localizacoes = localizacoes;
    },
    watch: {
        lote: {
            immediate: true,
            handler(val) {
                if (val) {
                    this.form = {
                        numero_lote: val.numero_lote,
                        preco_custo: val.preco_custo,
                        preco_venda: val.preco_venda,
                        produtoId: val.produto?.id || null,
                        quantidade: val.quantidade,
                        fornecedorId: val.fornecedor?.id || null,
                        localizacaoId: val.localizacao?.id || null,
                        data_entrada: Format.toDateInput(val.data_entrada),
                        data_validade: Format.toDateInput(val.data_validade)
                    };
                    this.produtoSelecionado = val.produto || null;
                    this.fornecedorSelecionado = val.fornecedor || null;
                    this.localizacaoSelecionada = val.localizacao || null;
                } else {
                    this.resetForm();
                }
            }
        }
    },
    methods: {
        resetForm() {
            this.form = {
                numero_lote: '',
                preco_custo: '',
                preco_venda: '',
                produtoId: null,
                quantidade: '',
                fornecedorId: null,
                localizacaoId: null,
                data_entrada: '',
                data_validade: ''
            };
            this.produtoSelecionado = null;
            this.fornecedorSelecionado = null;
            this.localizacaoSelecionada = null;
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
