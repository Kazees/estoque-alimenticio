import type { ProdutoFilter, ProdutoOutput } from "@/scripts/models/produto";
import { ProdutoService } from "@/scripts/services/ProdutoService";
import { defineStore } from "pinia";

export const useProdutoStore = defineStore("produto", {
    state: () => {
        const savedFilter = localStorage.getItem('produtoFilter')
        return {
            produtos: [] as ProdutoOutput[],
            loading: false,
            filter: savedFilter ? JSON.parse(savedFilter) : { page: 1, size: 10 } as ProdutoFilter
        }
    },
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
            localStorage.setItem("produtoFilter", JSON.stringify(this.filter));
            this.list();
        }
    }
})