export const Format = {
    formatEnum: (value: string): string => {
        return value
            .charAt(0).toUpperCase() + value.slice(1)
            .toLowerCase();
    },
    toDateInput: (value: string | Date | undefined): string => {
        if (!value) return '';
        return String(value).split('T')[0];
    }, // Para tratar casos desse tipo 2025-01-15T00:00:00.000Z
    toAddress: (endereco: any): string => {
        if (!endereco) return '';
        return [
            endereco.logradouro,
            endereco.numero,
            endereco.complemento,
            endereco.bairro?.name,
            endereco.municipio?.name,
            endereco.cep
        ].filter(Boolean).join(', ');
    }
}