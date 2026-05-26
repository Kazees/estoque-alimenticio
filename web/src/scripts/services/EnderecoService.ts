import BaseService from "./BaseService"

const EnderecoService = {
    listRegioes: (): Promise<any[]> => {
        return BaseService.get('/endereco/regioes').then(response => response.data);
    },
    listEstados: (): Promise<any[]> => {
        return BaseService.get('/endereco/estados').then(response => response.data);
    },
    listMunicipios: (estadoId: number): Promise<any[]> => {
        return BaseService.get('/endereco/municipios', { params: { estadoId } }).then(response => response.data);
    },
    listBairros: (municipioId: number): Promise<any[]> => {
        return BaseService.get('/endereco/bairros', { params: { municipioId } }).then(response => response.data);
    },
}

export {
    EnderecoService
}