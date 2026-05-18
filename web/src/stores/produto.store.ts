import type { ProdutoFilter, ProdutoOutput } from "@/scripts/models/produto";
import { ProdutoService } from "@/scripts/services/ProdutoService";
import { defineStore } from "pinia";

export const useProdutoStore = defineStore("produto", {
    state: () => ({
        loading: false,
        produtos: [] as ProdutoOutput[],
        filter: {
            name: undefined as string | undefined,
            active: undefined as boolean | undefined,
            precoMin: undefined as number | undefined,
            precoMax: undefined as number | undefined,
            page: 1,
            size: 10
        }
    }),
    getters: {
        produtosAtivos(): ProdutoOutput[] {
            return this.produtos.filter(produto => produto.active);
        }
    },
    actions: {
        async list(): Promise<void> {
            this.loading = true;
            try {
                this.produtos = await ProdutoService.list(this.filter);
            }
            catch (error) {
                console.error("Erro ao listar produtos:", error);
            }
            finally {
                this.loading = false;
            }
        },
        setFilter(filter: ProdutoFilter): void {
            this.filter = { ...this.filter, ...filter };
            this.list();
        }
    }
})