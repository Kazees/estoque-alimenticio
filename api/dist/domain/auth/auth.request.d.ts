import { Request } from "express";
import { AuthPayload } from "./auth.payload";
export interface AuthRequest extends Request {
    auth: AuthPayload;
}
