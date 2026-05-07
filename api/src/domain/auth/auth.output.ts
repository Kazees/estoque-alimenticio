import { ApiProperty } from "@nestjs/swagger";
import { AuthRoles } from "./auth.roles";
import { AuthPayload } from "./auth.payload";

export class AuthOutput {
    @ApiProperty()
    nome: string;
    
    @ApiProperty()
    email: string;

    @ApiProperty({ enum: AuthRoles })
    role: AuthRoles;

    @ApiProperty()
    token: string;

    constructor(token: string, auth: AuthPayload) {
        this.nome = auth.name;
        this.email = auth.email;
        this.role = auth.role;
        this.token = token;
    }
}