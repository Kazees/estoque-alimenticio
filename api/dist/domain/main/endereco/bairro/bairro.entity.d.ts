import { MunicipioEntity } from "../municipio/municipio.entity";
export declare class BairroEntity {
    id: number;
    name: string;
    municipioId: number;
    municipio: MunicipioEntity;
}
