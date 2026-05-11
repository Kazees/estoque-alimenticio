import { RegiaoEntity } from "../regiao/regiao.entity";
export declare class EstadoEntity {
    id: number;
    codigoUf: number;
    name: string;
    uf: string;
    regiaoId: number;
    regiao: RegiaoEntity;
}
