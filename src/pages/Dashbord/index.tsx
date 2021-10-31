import { Switch } from '@material-ui/core';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Carousel } from 'primereact/carousel';
import { Chart } from 'primereact/chart';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Divider } from 'primereact/divider';
import { SplitButton } from 'primereact/splitbutton';
import { Toast } from 'primereact/toast';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { ButtonBase } from '../../components/ButtonBase';
import FooterAdmin from '../../components/FooterAdmin';
import { HeaderAdmin } from '../../components/HeaderAdmin';
import Summary from '../../components/Summary';
import { IProduto } from '../../domain/types/IProduto';
import { DashboardService } from '../../services/DashbordServices/dashboardService';
import { PedidoService } from '../../services/PedidoService/pedidoService';
import { ProdutoService } from '../../services/ProdutoService/produtoServices';
import DashboardStore from '../../stores/DashboardStore';
import ProdutoStore from "../../stores/ProdutoStore";
import { Utils } from '../../utils/utils';
import { Container } from './styles';


const Dashbord: React.FC = () => {

  const pedidoPagos = 5;
  const msg = useRef<Toast>(null);
  const storeBoard = useContext(DashboardStore);
  const store = useContext(ProdutoStore);
  const [produtos, setProduto] = useState<IProduto[]>([]);


  const produtoService = new ProdutoService();
  const dashboardService = new DashboardService();

  useEffect(() => {
    produtoService.getProdutos().then(
      data => setProduto(data)
    ).catch(error => {
      Utils.messagemShow(msg, 'error', 'Erro de listagem', error.mensagemUsuario, 5000);
    });
  }, []);
  useEffect(() => {
    dashboardService.getBashboard().then(data => 
      {
        storeBoard.dashboard=data
      }
    ).catch(error => {
      Utils.messagemShow(msg, 'error', 'Erro de carregamento', error.mensagemUsuario, 5000);
    });
  }, []);

  const responsiveOptions = [
    {
      breakpoint: '1024px',
      numVisible: 3,
      numScroll: 3
    },
    {
      breakpoint: '600px',
      numVisible: 2,
      numScroll: 2
    },
    {
      breakpoint: '480px',
      numVisible: 1,
      numScroll: 1
    }
  ];


  const productTemplate = (product: IProduto) => {
    let img = '';
    if (product.imagens[0].objectURL) {
      img = product.imagens[0].objectURL;
    }

    return (
      <div className="product-item">
        <div className="product-item-content">
          <div className="p-mb-3">
            <img src={img} style={{ width: '3rem' }} onError={(e) => e.currentTarget.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={product.titulo} className="product-image" />
          </div>
          <div>
            <h4 className="p-mb-1">{"Nome:" + product.titulo}</h4>
            <h6 className="p-mt-0 p-mb-1">{"500 itens vendidos | Ultima venda 4 horas"}</h6>
          </div>
        </div>
      </div>
    );
  }

  // logica de total de vendas
  const emogi = () => {
    let emo = [{ emogi: Utils.getEmogi()[0], text: 'Este mês a Loja foi um sucesso de vendas comparação do mês passado' },
    { emogi: Utils.getEmogi()[1], text: 'Este mês a Loja foi bom, mais precisa melhorar fez apenas 25% maior que o mês anterior' },
    { emogi: Utils.getEmogi()[2], text: 'Este mês a Loja foi igual ao mês passado' },
    { emogi: Utils.getEmogi()[3], text: 'Este mês a Loja está muito abaixo do que o mês anterior' },
    { emogi: Utils.getEmogi()[4], text: 'Este mês a Loja não fez vendas sugiro reavaliar seu Marketing' }
    ];
    let messagem = null;
    let totalPedidosMes = storeBoard.dashboard.totalGeralMes;
    let totalPedidosMesPassado = storeBoard.dashboard.totalGeralMesPassado;
    if (totalPedidosMes === 0) {
      messagem = emo[4];
    } else if (((totalPedidosMes - totalPedidosMesPassado) / 1000) * 100 <= 25) {
      messagem = emo[1];
    } else if (((totalPedidosMes - totalPedidosMesPassado) / 1000) * 100 <= 5) {
      messagem = emo[2];
    } else if (((totalPedidosMes - totalPedidosMesPassado) / 1000) * 100 <= 0) {
      messagem = emo[3];
    } else if (totalPedidosMes > totalPedidosMesPassado) {
      messagem = emo[0];
    } else if (pedidoPagos < 10) {
      messagem = emo[0];
    }
    return messagem;
  }


  const getLightTheme = () => {
    let basicOptions = {
      maintainAspectRatio: false,
      aspectRatio: .8,
      plugins: {
        legend: {
          labels: {
            color: '#495057'
          },
          
        }
      },
      scales: {
        x: {
          ticks: {
            color: '#495057'
          },
          grid: {
            color: '#ebedef'
          },

        },
        y: {
          ticks: {
            color: '#495057'
          },
          grid: {
            color: '#ebedef'
          }
        }
      }
    };
    let lightOptions = {
      plugins: {
        legend: {
          labels: {
            color: '#495057'
          }
        }
      }
    };
    let horizontalOptions = {
      indexAxis: 'y',
      maintainAspectRatio: false,
      aspectRatio: .8,
      plugins: {
        legend: {
          labels: {
            color: '#495057'
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: '#495057'
          },
          grid: {
            color: '#ebedef'
          }
        },
        y: {
          ticks: {
            color: '#495057'
          },
          grid: {
            color: '#ebedef'
          }
        }
      }
    };

    return {
      basicOptions, horizontalOptions, lightOptions
    }
  }
  const { basicOptions, horizontalOptions, lightOptions } = getLightTheme();
  // logica do grafico de formas de pagamentos===============
  const faturamentoHora = {
    labels: Utils.getUltimasHoras(),
    datasets: [
      {
        label: 'Faturamento dos últimas 12 horas',
        data: storeBoard.dashboard.arrayFaturamentoMensal,
        fill: true,
        tension: .4,
        borderColor: '#53e79d',
        backgroundColor: '#88ecd633'
      },
      // {
      //   label: 'Boleto / Dinheiro',
      //   data: [28, 48, 40, 19, 86, 27, 90],
      //   fill: true,
      //   borderDash: [5, 5],
      //   tension: .4,
      //   borderColor: '#66BB6A',
      //   backgroundColor: '#5dce9133'
      // },
    ]
  };

  // logica do grafico de formas de pagamentos===============
  const faturamentoMesal = {
    labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    datasets: [
      {
        label: 'Faturamento dos ultimos 12 meses',
        data: storeBoard.dashboard.arrayFaturamentoMensal,
        fill: true,
        tension: .4,
        borderColor: '#42A5F5',
        backgroundColor: '#2662c333'
      },
      // {
      //   label: 'Boleto / Dinheiro',
      //   data: [28, 48, 40, 19, 86, 27, 90],
      //   fill: true,
      //   borderDash: [5, 5],
      //   tension: .4,
      //   borderColor: '#66BB6A',
      //   backgroundColor: '#5dce9133'
      // },
    ]
  };

  // logica do grafico de formas de pagamentos===============
  const chartData = {
    labels: ['Cartão de crédito', 'Dinheiro', 'Outros'],
    datasets: [
      {
        data: storeBoard.dashboard.arrayFormasPagamentos,
        backgroundColor: [
          "#E74C3C",
          "#62A9A5",
          "#F8EA72"
        ],
        hoverBackgroundColor: [
          "#64B5F6",
          "#81C784",
          "#FFB74D"
        ]
      }
    ]
  };
  // ==============logica grafico de categorias vendidas=========================
  const topDezCategorias = {
    labels: storeBoard.dashboard.arrayVendaPorCategorias.map(item => item.nome),
    datasets: [
      {
        label: 'top 10 das categorias',
        backgroundColor: '#42A5F5',
        data: storeBoard.dashboard.arrayVendaPorCategorias.map(item =>  item.valor)
      },
    ]
  };
  // ==============logica grafico de categorias vendidas=========================
  const topDezCliente = {
    labels: storeBoard.dashboard.arrayTopClientes.map(item => item.nome),
    datasets: [
      {
        label: 'Clientes com recorrência',
        backgroundColor: '#42A5F5',
        data: storeBoard.dashboard.arrayTopClientes.map(item => item.valor)
      },
    ]
  };

  // ==============logica grafico de faturamento anual=========================
  const dataFaturamentoAnual = {
    labels: Utils.getUltimosAnos(),
    datasets: [
      {
        label: 'Vendas dos últimos 5 anos',
        backgroundColor: '#42A5F5',
        data: storeBoard.dashboard.arrayFaturamentoAnual
      },
    ]
  };
  const [totalFinalizado, setFinalizados] = useState(0);
  const [totalPago, setPagos] = useState(0);
  const [totalCancelado, setCancelados] = useState(0);
  const detalhesMarktplace = (rowData: any) => {

  }

  const bodyTemplateColumnA = (rowData: any) => {
    return (
      <div>
        <span className="p-column-title">Marketplace:</span>
        <span style={{fontWeight: 'bold'}}>{rowData.marketplace}</span>
      </div>
    );
  }
  const bodyTemplateColumnB = (rowData: any) => {
    return (
      <div>
        <span className="p-column-title">Finalizados:</span>
        <span style={{ color: 'var(--green)', fontWeight: 'bold'}}>{Utils.formatCurrency(rowData.finalizado)}</span>
      </div>
    );
  }
  const bodyTemplateColumnC = (rowData: any) => {
    return (
      <div>
        <span className="p-column-title">Pagos:</span>
        <span style={{ color: 'var(--blue)', fontWeight: 'bold'}}>{Utils.formatCurrency(rowData.pago)}</span>
      </div>
    );
  }
  const bodyTemplateColumnD = (rowData: any) => {
    return (
      <div>
        <span className="p-column-title">Cancelados:</span>
        <span style={{ color: 'var(--red)', fontWeight: 'bold'}}>{Utils.formatCurrency(rowData.cancelado)}</span>
      </div>
    );
  }
  const actionBodyTemplate = (rowData: any) => {
    return (
      <div className="buttonAction">
        <Button label="" icon="pi pi-chart-bar" className="p-button-primary p-mr-2 p-mb-2" tooltip="Ver detalhes" onClick={() => detalhesMarktplace(rowData)} />
      </div>
    );
  }
  window.onload = totalizadorTable;
  function totalizadorTable() {
    let t_finalizados: number = 0;
    let t_pagos: number = 0;
    let t_pedentes: number = 0;

    storeBoard.dashboard.arrayMarketplaces.forEach(item => {
      t_finalizados += item.finalizado;
      t_pagos += item.pago;
      t_pedentes += item.cancelado;
    });

    setFinalizados(t_finalizados);
    setPagos(t_pagos);
    setCancelados(t_pedentes);

  }

  const items = [
    {
      label: 'Últimos 5 dias',
      icon: 'pi pi-calendar',
      command: () => {
        console.log("alal");
      }
    },
    {
      label: 'Últimos 15 dias',
      icon: 'pi pi-calendar-minus',
      command: () => {
        console.log("alal");
      }
    },
    {
      label: 'Últimos 30 dias',
      icon: 'pi pi-calendar-plus',
      command: () => {
        console.log("alal");
      }
    },
  ];

  const label = { inputProps: { 'aria-label': 'Switch demo' } };

  const [dtIni, setIni] = useState<Date | Date[] | undefined>(new Date());
  const [dtFin, setFin] = useState<Date | Date[] | undefined>(new Date());
  const [dataVisible, setDataVisible] = useState('none');
  const [filrtoVisible, setFiltroVisible] = useState('block');

  const setVisibleData = () => {
    if (dataVisible === 'block') {
      setDataVisible('none');
      setFiltroVisible('block');
    } else {
      setFiltroVisible('none');
      setDataVisible('block');
    }
  }

  return <Container>
    <HeaderAdmin />
    <div className="p-grid  p-mb-2 p-col-12">
      <div className="p-col-4" style={{ color: 'var(--text-title)' }}>
        <label>
          <h1>Dashboard da Loja</h1>
          <small>Relatórios financeiros</small>
        </label>
      </div>

      <div className="p-grid p-col-8 p-text-right">

        <div className="p-col-9">
          <label htmlFor="">Por data</label>
          <Switch {...label} defaultChecked onClick={setVisibleData} />
          <label htmlFor="">Por dia</label>
        </div>
        <div className="p-col-3">
          <div className="p-field" style={{ display: `${filrtoVisible}` }}>
            <SplitButton label="Filtro" icon="pi pi-filter" model={items} className=""></SplitButton>
          </div>
          <div className="p-field p-col-12" style={{ display: `${dataVisible}` }}>
            <label htmlFor="icon">Data Inicial</label>
            <Calendar id="icon" value={dtIni} onChange={(e) => setIni(e.value)} showIcon />
          </div>
          <div className="p-field p-col-12" style={{ display: `${dataVisible}` }}>
            <label htmlFor="icon">Data Final</label>
            <Calendar id="icon" value={dtFin} onChange={(e) => setFin(e.value)} showIcon />
          </div>
        </div>
      </div>

    </div>
    <Divider className="divider" />
    {/* =========================gird listagem 01============================ */}
    <div className="p-grid  p-mb-2 p-col-12 center">
      <div className="p-col-12  p-lg-3 p-xl-3 p-mb-2" >
        <Summary label="Ticket médio" description={storeBoard.dashboard.ticketMedio.quantidade + "- item por pedido"} value={storeBoard.dashboard.ticketMedio.total} icon="pi pi-money-bill" color="#2C73D2" />
      </div>
      <div className="p-col-12  p-lg-3 p-xl-3 p-mb-2" >
        <Summary label="Pedido realizados" description={storeBoard.dashboard.totalPedidoRealizado.quantidade + "- item por pedido"} value={storeBoard.dashboard.totalPedidoRealizado.total} icon="pi pi-shopping-cart" color="#1ABC9C" />
      </div>
      <div className="p-col-12  p-lg-3 p-xl-3 p-mb-2" >
        <Summary label="Pedido pagos" description={storeBoard.dashboard.totalPedidoPago.quantidade + "- item por pedido"} value={storeBoard.dashboard.totalPedidoPago.total} icon="pi pi-shopping-cart" color="#62A9A5" />
      </div>
      <div className="p-col-12 p-lg-3 p-xl-3 p-mb-2" >
        <Summary label="Pedidos cancelados" description={storeBoard.dashboard.totalPedidoCancelado.quantidade + "- item por pedido"} value={storeBoard.dashboard.totalPedidoCancelado.total} icon="pi pi-shopping-cart" color="#E74C3C" />
      </div>
    </div>
    {/* =========================gird listagem 02============================ */}
    <div className="p-grid p-col-12 center ">
      <div className='p-col-12 p-lg-6 p-xl-6 p-mb-2'>
        <div className="card-total p-shadow-5 p-field">
          <label htmlFor="" className='p-text-bold p-col-12'>Total das vendas</label>
          <div className='p-col-12 p-field p-grid p-mt-4 p-ml-3' style={{ fontSize: '40px' }}>
            {emogi()?.emogi}
            <p className='p-ml-2 p-col-10' style={{ fontSize: '20px' }}>{emogi()?.text}</p>
          </div>
          <label className="p-col-12 p-pb-3 p-text-bold total-style">{Utils.formatCurrency(storeBoard.dashboard.totalGeralMes)}</label>
        </div>
      </div>
      {/* card 02 */}
      <div className='p-col-12 p-lg-6 p-xl-6'>
        <div className='card-total p-shadow-5 p-field'>
          <label htmlFor="" className='p-text-bold p-col-12'>Detalhes de vendas da Loja no site</label>
          <div className="p-grid p-field p-col-12 center">
            <div className="p-field p-col-5">
              <p className="p-field p-mt-3">Varejo</p>
              <div className="p-text-bold p-field p-col-12">
                <label className='p-col-12' style={{ color: 'var(--blue)' }} >{Utils.formatCurrency(storeBoard.dashboard.totalVarejo)}
                  <br />
                  <small style={{ color: 'black' }}>Total das  vendas</small></label>
              </div>
              <div className="p-text-bold p-field p-col-12">
                <label className='p-col-12' style={{ color: 'var(--red)' }}>{Utils.formatCurrency(storeBoard.dashboard.totalVarejoCredito)}
                  <br />
                  <small style={{ color: 'black' }}>Cartão de crédito</small></label>
              </div>
              <div className="p-text-bold p-field p-col-12">
                <label className='p-col-12' style={{ color: 'var(--green)' }}>{Utils.formatCurrency(storeBoard.dashboard.totalVarejoBoleto)}
                  <br />
                  <small style={{ color: 'black' }}>Boleto / Dinheiro</small></label>
              </div>
            </div>
            <Divider className="divider" layout="vertical" />
            <div className="p-field  p-col-5">
              <p className="p-field p-mt-3">Atacado</p>
              <div className="p-text-bold p-field p-col-12">
                <label className='p-col-12' style={{ color: 'var(--blue)' }} >{Utils.formatCurrency(storeBoard.dashboard.totalAtacado)}
                  <br />
                  <small style={{ color: 'black' }}>Total das  vendas</small></label>
              </div>
              <div className="p-text-bold p-field p-col-12">
                <label className='p-col-12' style={{ color: 'var(--red)' }}>{Utils.formatCurrency(storeBoard.dashboard.totalAtacadoCredito)}
                  <br />
                  <small style={{ color: 'black' }}>Cartão de crédito</small></label>
              </div>
              <div className="p-text-bold p-field p-col-12">
                <label className='p-col-12' style={{ color: 'var(--green)' }}>{Utils.formatCurrency(storeBoard.dashboard.totalAtacadoBoleto)}
                  <br />
                  <small style={{ color: 'black' }}>Boleto / Dinheiro</small></label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/*============================== gird de listagem 03 =========================*/}
    <div className='p-grid center p-mb-2 p-col-12'>
      <div className='p-col-12'>
        <div className='card-total p-shadow-4 p-mb-2 p-col-12 p-lg-12 p-xl-12 p-field'>
          <label htmlFor="" className='p-text-bold p-col-12'>Faturamento por hora</label>
          <div className="card ">
            <Chart type="line" data={faturamentoHora} options={basicOptions} />
          </div>
        </div>
      </div>

    </div>
    {/*============================== gird de listagem 04 =========================*/}
    <div className='p-grid center p-mb-2 p-col-12'>
      <div className='p-col-12 p-lg-4 p-xl-4'>
        <div className='card-total p-shadow-4 p-mb-2 p-field'>
          <label htmlFor="" className='p-text-bold p-col-12'>Categoria mais vendidas</label>
          <div className="card">
            <Chart type="bar" data={topDezCategorias} options={horizontalOptions} />
          </div>
        </div>
      </div>
      <div className='p-col-12 p-lg-4 p-xl-4'>
        <div className='card-total p-shadow-4 p-mb-2 p-field'>
          <label htmlFor="" className='p-text-bold p-col-12'>Formas de pagamentos</label>
          <div className="card p-d-flex p-jc-center p-col-12 p-pb-6">
            <Chart type="pie" data={chartData} options={lightOptions} />
          </div>

        </div>
      </div>
      <div className='p-col-12 p-lg-4 p-xl-4'>
        <div className='card-total p-shadow-4 p-mb-2 p-field'>
          <label htmlFor="" className='p-text-bold p-col-12'>Top 10 de clientes</label>
          <div className="card">
            <Chart type="bar" data={topDezCliente} options={horizontalOptions} />
          </div>
        </div>
      </div>
    </div>

    {/*============================== gird de listagem 05 =========================*/}

    <div className="card-total p-shadow-2 p-mb-2">
      <div className='p-col-12'>
        <label className="p-text-bold p-p-5 p-mt-5 p-pb-4">Os mais vendidos</label>
        <Carousel value={produtos} numVisible={4} numScroll={4} responsiveOptions={responsiveOptions}
          className="custom-carousel p-mt-4 p-col-12"
          circular
          autoplayInterval={5000}
          itemTemplate={productTemplate}
        />
      </div>
    </div>

    {/*============================== gird de listagem 06 =========================*/}
    <div className='p-grid center p-mb-2 p-col-12'>
      <div className='p-col-12 p-lg-12 p-xl-12'>
        <div className='card-total p-shadow-4 p-field'>
          <label htmlFor="" className='p-text-bold p-col-12'>Detalhes de vendas no Marketplace</label>
          <div className="datatable-crud-demo datatable-responsive-demo">
            <div className="table">
              <DataTable
                value={storeBoard.dashboard.arrayMarketplaces}
                dataKey="id"
                scrollable
                className="p-datatable-responsive-demo"
              >
                <Column field="marketplace" header="Marketplace" body={bodyTemplateColumnA} headerStyle={{ width: '24%' }} sortable></Column>
                <Column field="finalizado" header="Finalizados" body={bodyTemplateColumnB} sortable headerStyle={{ width: '24.8%' }}></Column>
                <Column field="pago" header="Pagos" body={bodyTemplateColumnC} sortable headerStyle={{ width: '24.8%' }}></Column>
                <Column field="cancelado" header="Cancelados" body={bodyTemplateColumnD} sortable headerStyle={{ width: '16%' }}></Column>
                <Column body={actionBodyTemplate}></Column>
              </DataTable>
            </div>
          </div>

          <Divider className="divider" />
          <div className='p-grid p-col-12'>
            <div className='p-col-3 p-text-bold'>
              <label htmlFor="">TOTAL GERAL:</label>
            </div>
            <div className='p-col-3 p-text-bold'>
              <label htmlFor="" style={{ color: 'var(--green)' }} >{Utils.formatCurrency(totalFinalizado)}</label>
            </div>
            <div className='p-col-3 p-text-bold'>
              <label htmlFor="" style={{ color: 'var(--blue)' }}>{Utils.formatCurrency(totalPago)}</label>
            </div>
            <div className='p-col-3 p-text-bold'>
              <label htmlFor="" style={{ color: 'var(--red)' }}>{Utils.formatCurrency(totalCancelado)}</label>
            </div>
          </div>
        </div>
      </div>
    </div>


    {/*============================== gird de listagem 07 =========================*/}
    <div className='p-grid center p-mb-6 p-col-12'>
      <div className='p-mb-2 p-col-12 p-lg-5 p-xl-5'>
        <div className='card-total p-shadow-4 p-field'>
          <label htmlFor="" className='p-text-bold p-col-12'>Faturamento Anual</label>
          <div className="card">
            <Chart type="bar" data={dataFaturamentoAnual} options={basicOptions} />
          </div>
        </div>

      </div>
      <div className='p-mb-2 p-col-12 p-lg-7 p-xl-7'>
        <div className='card-total p-shadow-4 p-field'>
          <label htmlFor="" className='p-text-bold p-col-12'>Faturamento Mensal</label>
          <div className="card">
            <Chart type="line" data={faturamentoMesal} options={basicOptions} />
          </div>

        </div>

      </div>
    </div>
    <FooterAdmin />
    <Toast ref={msg} />
  </Container>;
}

export default Dashbord;