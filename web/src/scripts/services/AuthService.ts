import type { FuncionarioModel } from "../models/funcionario";
import BaseService from "./BaseService";

const AuthService = {
    init() {
        const token = localStorage.getItem("token");
        if (token) {
            BaseService.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
    },
    async login(email: string, password: string): Promise<{ token: string, user: FuncionarioModel }> {
        const response = await BaseService.post("/auth", { email, password });
        return response.data;
    },
    async logout(): Promise<void> {
        delete BaseService.defaults.headers.common['Authorization'];
    }
}

export default AuthService;