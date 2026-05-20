import type { FuncionarioModel } from "@/scripts/models/funcionario";
import AuthService from "@/scripts/services/AuthService";
import BaseService from "@/scripts/services/BaseService";
import { RolesEnum } from "@/scripts/utils/Enums";
import { defineStore } from "pinia";
import type { Router } from "vue-router";
import { jwtDecode } from 'jwt-decode';
import type { AuthPayload } from "@/scripts/models/auth";

export const useAuthStore = defineStore("auth", {
    state: () => {
        const token = localStorage.getItem("token") || null
        const payload = token ? jwtDecode<AuthPayload>(token) : null
        return {
            token,
            user: payload ? {
                id: Number(payload.sub),
                name: payload.name,
                email: payload.email,
                role: payload.role
            } as FuncionarioModel : undefined,
            loading: false
        }
    },
    getters: {
        isAuthenticated(): boolean {
            return !!this.token;
        },
        isAdmin(): boolean {
            return this.user?.role === RolesEnum.ADMIN;
        }
    },
    actions: {
        async login(email: string, password: string, router: Router): Promise<void> {
            this.loading = true;

            try {
                const data = await AuthService.login(email, password);
                this.token = data.token;
                localStorage.setItem("token", data.token);
                BaseService.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;

                const payload = jwtDecode<AuthPayload>(data.token);
                this.user = {
                    id: Number(payload.sub),
                    name: payload.name,
                    email: payload.email,
                    role: payload.role
                } as FuncionarioModel;

                if(this.user?.role === RolesEnum.ADMIN) await router.push('/admin/funcionarios');
                else await router.push('/produto');
            }
            catch (error) {
                console.error("Erro ao fazer login:", error);
                throw error;
            }
            finally {
                this.loading = false;
            }
        },
        async logout(router: Router): Promise<void> {
            AuthService.logout();
            this.token = null;
            this.user = undefined;
            localStorage.removeItem("token");

            router.push('/login');
        }
    }
})