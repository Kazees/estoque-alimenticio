import type { TransacoesFilter, TransacoesOutput } from "@/scripts/models/transacoes";
import { TransacaoService } from "@/scripts/services/TransacaoService";
import { defineStore } from "pinia";

export const useTransacoesStore = defineStore("transacoes", {
    state: () => ({
        loading: false,
        transacoes: [] as TransacoesOutput[],
        filter: {
            produtoId: undefined,
            quantidade: undefined,
            tipo: undefined,
            funcionarioId: undefined,
            dataInicio: undefined,
            dataFim: undefined,
            page: 1,
            size: 10
        } as TransacoesFilter
    }),
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
            this.list();
        }
    }
});