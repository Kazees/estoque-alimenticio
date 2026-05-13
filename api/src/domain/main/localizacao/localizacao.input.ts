import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class LocalizacaoInput {
    @ApiProperty({
        example: '3',
        description: 'Corredores da Localização',
        required: true
    })
    @IsNotEmpty({ message: 'O número de corredores deve ser informado' })
    corredores: string;

    @ApiProperty({
        example: '3',
        description: 'Prateleiras da Localização',
        required: true
    })
    @IsNotEmpty({ message: 'O número de prateleiras deve ser informado' })
    prateleiras: string;

    @ApiProperty({
        example: '3',
        description: 'Seções da Localização',
        required: true
    })
    @IsNotEmpty({ message: 'O número de seções deve ser informado' })
    seccoes: string;
}