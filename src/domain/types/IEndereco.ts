export interface IEndereco{
    id: number | null;
    logradouro: string;
    numero: string;
    complemento: string;
    bairro: string;
    cidade: string;
    cep: string;
    uf : string;
    padrao?: string | null;
}