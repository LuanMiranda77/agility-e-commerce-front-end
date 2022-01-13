export interface IPagamento{
    id: Number | null;
    numeroDeParcelas: Number;
    // dataEmissao: Date;
    dataVencimento: Date | null;
    dataPagamento: Date | null;
    tipo: String;
    estatus: String;
}