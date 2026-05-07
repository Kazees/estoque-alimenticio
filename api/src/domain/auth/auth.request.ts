import { Request } from "express";
import { AuthPayload } from "./auth.payload";

export interface AuthRequest extends Request {
    auth: AuthPayload;
}

// Quando o guard valida o token JWT, ele decodifica o payload e o armazena em req.auth, 
// ou seja, já tem acesso aos dados do usuário autenticado.