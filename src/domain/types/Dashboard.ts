export interface IDashboard {
    ticketMedio: {total:number, quantidade:number},
    totalPedidoRealizado: {total:number, quantidade:number},
    totalPedidoPago: {total:number, quantidade:number},
    totalPedidoCancelado: {total:number, quantidade:number},
    totalGeralMes: number,
    totalGeralMesPassado: number,
    totalVarejo: number,
    totalAtacado: number,
    totalVarejoCredito: number,
    totalVarejoBoleto: number,
    totalAtacadoCredito: number,
    totalAtacadoBoleto: number,
    arrayVendaPorHoras: any[],
    arrayVendaPorCategorias: any[],
    arrayFormasPagamentos: number[],
    arrayTopClientes: any[],
    arrayMarketplaces: any[],
    arrayFaturamentoAnual: number[],
    arrayFaturamentoMensal: number[],
    
    
}