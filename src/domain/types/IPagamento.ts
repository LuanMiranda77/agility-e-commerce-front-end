export interface IPagamento{
    id: Number;
    numeroDeParcelas: Number;
    // dataEmissao: Date;
    dataVencimento: Date;
    dataPagamento: Date;
    tipo: String;
    estatus: String;
}