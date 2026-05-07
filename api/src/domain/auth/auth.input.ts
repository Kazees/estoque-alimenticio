import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, ValidateIf } from "class-validator";

export class AuthInput {
    @ApiProperty({
        example: 'ZB4b4@example.com',
        description: 'E-mail do Funcionário',
        required: true
    })
    @ValidateIf(o => o.email !== undefined)
    @IsEmail()
    @IsNotEmpty({ message: 'O e-mail deve ser informado' })
    email: string;

    @ApiProperty({
        example: '123456',
        description: 'Senha do Funcionário',
        required: true
    })
    @ValidateIf(o => o.password !== undefined)
    @IsNotEmpty({ message: 'A senha deve ser informada' })
    password: string;
}