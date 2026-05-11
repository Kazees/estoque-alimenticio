import { EstadoEntity } from "../estado/estado.entity";
export declare class MunicipioEntity {
    id: number;
    codigo: string;
    name: string;
    estadoId: number;
    estado: EstadoEntity;
}
