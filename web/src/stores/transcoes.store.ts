import type { TransacoesFilter, TransacoesOutput } from "@/scripts/models/transacoes";
import { TransacaoService } from "@/scripts/services/TransacaoService";
import { defineStore } from "pinia";

export const useTransacoesStore = defineStore("transacoes", {
    state: () => {
        const savedFilter = localStorage.getItem('transacoesFilter')
        return {
            transacoes: [] as TransacoesOutput[],
            loading: false,
            filter: savedFilter ? JSON.parse(savedFilter) : { page: 1, size: 10 } as TransacoesFilter
        }
    },
    actions: {
        async list(): Promise<void> {
            this.loading = true;
            try {
                this.transacoes = await TransacaoService.list(this.filter);
            }
            catch (error) {
                console.error("Erro ao listar transações:", error);
            }
            finally {
                this.loading = false;
            }
        },
        setFilter(filter: TransacoesFilter): void {
            this.filter = { ...this.filter, ...filter };
            localStorage.setItem("transacoesFilter", JSON.stringify(this.filter));
            this.list();
        }
    }
});