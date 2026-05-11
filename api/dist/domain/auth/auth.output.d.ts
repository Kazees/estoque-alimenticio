import { AuthRoles } from "./auth.roles";
import { AuthPayload } from "./auth.payload";
export declare class AuthOutput {
    nome: string;
    email: string;
    role: AuthRoles;
    token: string;
    constructor(token: string, auth: AuthPayload);
}
