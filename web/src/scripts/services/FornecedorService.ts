import type { FornecedorInput, FornecedorOutput } from "../models/fornecedor";
import type { PageFilter } from "../utils/Filter";
import BaseService from "./BaseService";

const FornecedorService = {
    create: (data: FornecedorInput): Promise<FornecedorOutput> => {
        return BaseService.post("/fornecedor", data).then(response => response.data);
    },
    list: (filter?: PageFilter): Promise<FornecedorOutput[]> => {
        return BaseService.get("/fornecedor", { params: filter }).then(response => response.data);
    },
    getById: (id: number): Promise<FornecedorOutput> => {
        return BaseService.get(`/fornecedor/${id}`).then(response => response.data);
    },
    delete: (id: number): Promise<void> => {
        return BaseService.delete(`/fornecedor/${id}`).then(response => response.data);
    },
    update: (id: number, data: FornecedorInput): Promise<FornecedorOutput> => {
        return BaseService.patch(`/fornecedor/${id}`, data).then(response => response.data);
    }
}

export {
    FornecedorService
}