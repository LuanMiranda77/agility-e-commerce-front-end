
import { ICheckout } from "../../domain/types/ICheckout";
import { integrador, api } from "../api";



export class CheckoutService {

    url='/api/m_pago';

    

    public async enviarPagemento(checkout:ICheckout) : Promise<any> {
        const response = await integrador.post(this.url+'/pagamento', checkout).then(response =>{
            return response.data;
          }).catch(error=>{
            console.error("Erro desenvolvedor:",error.response.data.mensagemDesenvolvedor[0]);
            return Promise.reject(error.response.data.mensagemUsuario);
          });
        // ticketMedio: {total:500, quantidade:15},
        // totalPedidoRealizado: {total:3000, quantidade:150},
        // totalPedidoPago: {total:2000, quantidade:100},
        // totalPedidoCancelado: {total:1000, quantidade:50},
        // totalGeralMes: 3000,
        // totalGeralMesPassado: 1500,
        // totalVarejo: 2000,
        // totalAtacado: 1000,
        // totalVarejoCredito: 1500,
        // totalVarejoBoleto: 500,
        // totalAtacadoCredito: 500,
        // totalAtacadoBoleto: 500,
        // arrayVendaPorHoras: [500,100,20,50,60,70,80,90,100,120,200,300],//12 horas
        // arrayVendaPorCategorias: [{nome:'Relogio', valor:5000},{nome:'Terra', valor:7000},{nome:'Ferro', valor:5000}],//10 clientes
        // arrayFormasPagamentos: [2000,5000,1000],
        // arrayTopClientes: [{nome:'Luan', valor:5000},{nome:'MAria', valor:7000},{nome:'Paty', valor:5000}],
        // arrayMarketplaces: [{marketplace:'Shoppe', finalizado:5000, pago:1000, cancelado:2000},{marketplace:'Mercado livre', finalizado:5000, pago:1000, cancelado:2000}],
        // arrayFaturamentoAnual: [50000,20000,2000,50000,3000],// anos se houver
        // arrayFaturamentoMensal: [1200,500,2000,3000,400,200,600,700,800,900,1200,3454],}//12 meses se ouver
      return response;
    }

  

  
}