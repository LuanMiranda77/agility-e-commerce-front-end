import { makeObservable, observable } from "mobx";
import { createContext } from "react";
import { IDashboard } from "../domain/types/Dashboard";

class DashboardStore {

    objNew = {
        ticketMedio: {total:0, quantidade:0},
        totalPedidoRealizado: {total:0, quantidade:0},
        totalPedidoPago: {total:0, quantidade:0},
        totalPedidoCancelado: {total:0, quantidade:0},
        totalGeralMes: 0,
        totalGeralMesPassado: 0,
        totalVarejo: 0,
        totalAtacado: 0,
        totalVarejoCredito: 0,
        totalVarejoBoleto: 0,
        totalAtacadoCredito: 0,
        totalAtacadoBoleto: 0,
        arrayVendaPorHoras: new Array<any>(),
        arrayVendaPorCategorias: new Array<any>(),
        arrayFormasPagamentos: new Array<any>(),
        arrayTopClientes: new Array<any>(),
        arrayMarketplaces: new Array<any>(),
        arrayFaturamentoAnual: new Array<any>(),
        arrayFaturamentoMensal: new Array<any>()
    };

    @observable
    dashboard: IDashboard;


    constructor() {
        this.dashboard = this.objNew;
        makeObservable(this);
    }


}
export default createContext(new DashboardStore());