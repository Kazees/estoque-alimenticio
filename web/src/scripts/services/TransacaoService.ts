import type { TransacoesFilter, TransacoesInput, TransacoesOutput } from "../models/transacoes";
import BaseService from "./BaseService";

const TransacaoService = {
    save: (data: TransacoesInput): Promise<TransacoesOutput> => {
        return BaseService.post('/transacoes', data).then(response => response.data);
    },
    list: (filter?: TransacoesFilter): Promise<TransacoesOutput[]> => {
        return BaseService.get('/transacoes', { params: filter }).then(response => response.data);
    }
}

export {
    TransacaoService
}