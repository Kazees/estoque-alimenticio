import type { ProdutoFilter, ProdutoInput, ProdutoOutput } from "../models/produto"
import BaseService from "./BaseService"

const ProdutoService = {
    save: (data: ProdutoInput): Promise<ProdutoOutput> => {
        return BaseService.post("/produto", data).then(response => response.data);
    },
    update: (id: number, data: ProdutoInput): Promise<ProdutoOutput> => {
        return BaseService.patch(`/produto/${id}`, data).then(response => response.data);
    },
    delete: (id: number): Promise<void> => {
        return BaseService.delete(`/produto/${id}`).then(response => response.data);
    },
    list: (filter?: ProdutoFilter): Promise<ProdutoOutput[]> => {
        return BaseService.get("/produto", { params: filter }).then(response => response.data);
    }
}

export {
    ProdutoService
}