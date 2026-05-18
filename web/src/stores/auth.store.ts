import type { FuncionarioModel } from "@/scripts/models/funcionario";
import AuthService from "@/scripts/services/AuthService";
import BaseService from "@/scripts/services/BaseService";
import { RolesEnum } from "@/scripts/utils/Enums";
import { defineStore } from "pinia";
import type { Router } from "vue-router";
import { jwtDecode } from 'jwt-decode';
import type { AuthPayload } from "@/scripts/models/auth";

export const useAuthStore = defineStore("auth", {
    state: () => ({
        token: localStorage.getItem("token") || null,
        user: undefined as FuncionarioModel | undefined,
        loading: false
    }),
    getters: {
        isAuthenticated(): boolean {
            return !!this.token;
        },
        isAdmin(): boolean {
            const token = localStorage.getItem("token");
            if (!token) return false;
            return jwtDecode<AuthPayload>(token).role === RolesEnum.ADMIN;
        }
    },
    actions: {
        async login(email: string, password: string, router: Router): Promise<void> {
            this.loading = true;

            try {
                const data = await AuthService.login(email, password);
                this.token = data.token;
                this.user = data.user;
                localStorage.setItem("token", data.token);
                BaseService.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;

                if(this.user?.role === RolesEnum.ADMIN) await router.push('/admin');
                if(this.user?.role !== RolesEnum.ADMIN) await router.push('/dashboard');
            }
            catch (error) {
                console.error("Erro ao fazer login:", error);
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