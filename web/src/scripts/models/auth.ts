import type { RolesEnum } from "../utils/Enums"

export interface AuthPayload {
    sub: string
    email: string
    role: RolesEnum
    name: string
}