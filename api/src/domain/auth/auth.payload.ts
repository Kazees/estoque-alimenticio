import { AuthRoles } from "./auth.roles";

export interface AuthPayload {
    sub: string;
    email: string;
    role: AuthRoles;
    name: string;
}