import type { LocalizacaoModel } from "../models/localizacao";
import type { LoteInput, LoteOutput } from "../models/lote";
import type { PageFilter } from "../utils/Filter";
import BaseService from "./BaseService";

const LoteService = {
    save: (data: LoteInput): Promise<LoteOutput> => {
        return BaseService.post('/lote', data).then(response => response.data);
    },
    list: (filter?: PageFilter): Promise<LoteOutput[]> => {
        return BaseService.get('/lote', { params: filter }).then(response => response.data);
    },
    listLocalizacao: (filter?: PageFilter): Promise<LocalizacaoModel[]> => {
        return BaseService.get('/localizacao', { params: filter }).then(response => response.data);
    }
}

export {
    LoteService
}