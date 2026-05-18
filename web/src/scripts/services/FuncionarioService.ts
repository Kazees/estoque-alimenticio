import type { FuncionarioInput, FuncionarioOutput, FuncionarioUpdateInput } from "../models/funcionario"
import type { PageFilter } from "../utils/Filter";
import BaseService from "./BaseService"

const FuncionarioService = {
    me: (data: FuncionarioUpdateInput): Promise<FuncionarioOutput> => {
        return BaseService.patch("/funcionario/me", data).then(response => response.data);
    }
}

const AdminFuncionarioService = {
    create: (data: FuncionarioInput): Promise<FuncionarioOutput> => {
        return BaseService.post("/admin/funcionario", data).then(response => response.data);
    },
    list: (filter?: PageFilter): Promise<FuncionarioOutput[]> => {
        return BaseService.get("/admin/funcionario", { params: filter }).then(response => response.data);
    },
    delete: (id: number): Promise<void> => {
        return BaseService.delete(`/admin/funcionario/${id}`).then(response => response.data);
    }
}

export {
    FuncionarioService,
    AdminFuncionarioService
}