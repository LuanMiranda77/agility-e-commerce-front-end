import styled from "styled-components";

export const Container  = styled.div`

    //adicionar stylos
    margin-top: 5rem;

    label{
        color: var(--primary);
    }

    .card{
        background: var(--white);
        border-radius: 0.25rem;
        margin: 1rem;
    }
   
    .card-aviso{
        margin-left: 15rem;
        margin-right: 15rem;
        justify-content: center;
        padding: 0;
    }
     /* CarouselDemo.css */
     .product-item .product-item-content {
        background: white;
        border: 1px solid var(--surface-d);
        border-radius: 3px;
        margin: .3rem;
        /* text-align: center; */
        /* padding: 2rem 0; */
    }
    .product-item .product-image {
        width: 50%;
        height: 80px;
        /* box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23); */
    }

    .cursor-pointer{
        cursor: pointer;
    }

    /* *****stylos da tabela */
    .product-image {
        width: 100px;
        height: 100px;
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    }
    .react-modal-content{
        max-width: 20rem;
    }
    .datatable-responsive-demo .p-datatable-responsive-demo .p-datatable-tbody > tr > td .p-column-title {
        display: none;
    }

    .outofstock {
        font-weight: 700;
        color: #FF5252;
        text-decoration: line-through;
        text-align: center;
    }

    .lowstock {
        font-weight: 700;
        color: #FFA726;
    }

    .datatable-style-demo .instock {
        font-weight: 700;
        color: #66BB6A;
    }
    .multiselect-demo .p-multiselect {
    min-width: 15rem;
}

@media screen and (max-width: 40em) {
    //adicionar o stylo responsivo
    /* *****stylos da tabela */
    .titulo-modal{
        font-size: 8px;
        color: var(--white);
    }
    .table-header{
        margin-top: 6rem;
    }
    .card-image{
        width:200px;
        background: #fff;
    }

    .datatable-responsive-demo .p-datatable.p-datatable-responsive-demo .p-datatable-thead > tr > th,
    .datatable-responsive-demo .p-datatable.p-datatable-responsive-demo .p-datatable-tfoot > tr > td {
        display: none !important;
        
    }

    .datatable-responsive-demo .p-datatable.p-datatable-responsive-demo .p-datatable-tbody > tr > td {
        text-align: left;
        display: block;
        width: 30rem;
        float: left;
        clear: left;
        border: 0 none;
        background: #fff;
    }

    .datatable-responsive-demo .p-datatable.p-datatable-responsive-demo .p-datatable-tbody > tr > td .p-column-title {
        padding: .4rem;
        min-width: 30%;
        display: inline-block;
        margin: -.4em 1em -.4em -.4rem;
        font-weight: bold;
    }

    .datatable-responsive-demo .p-datatable.p-datatable-responsive-demo .p-datatable-tbody > tr > td:last-child {
        border-bottom: 1px solid var(--surface-d);
    }
    /* 8*8*8*8*8*8***************************************** */
}

`;

export const FormControl = styled.form`

    label{
        color: var(--primary);
    }

    .label-text{
        color: var(--text-title);
    }

    .center{
        margin:0 auto;
        justify-content: center;
        padding: 0;
    }

    .card{
        background: var(--white);
        border-radius: 0.24rem;
        margin-top: 1.8rem;
    }

    .card-pagamento{
        background: #FFFACD;
        border-radius: 0.25rem;
        margin-top: 0.5rem;
    }

      /* CarouselDemo.css */
      .product-item .product-item-content {
        background: white;
        border: 1px solid var(--surface-d);
        border-radius: 3px;
        margin: .3rem;
        /* text-align: center; */
        /* padding: 2rem 0; */
    }
    .product-item .product-image {
        width: 100%;
        height: 200px;
        /* box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23); */
    }

    .cursor-pointer{
        cursor: pointer;
    }

    /* css do cupom */
    @color-gray: #BCBCBC;
.text {
	&-center { text-align: center; }
}
.ttu { text-transform: uppercase; }

.printer-ticket {
	display: table !important;
	width: 100%;
	max-width: 400px;
	font-weight: light;
	line-height: 1.3em;
	@printer-padding-base: 10px;
	&, & * { 
		font-family: Tahoma, Geneva, sans-serif; 
		font-size: 10px; 
	}

	th:nth-child(2),
	td:nth-child(2) {
		width: 50px;
	}
	
	th:nth-child(3) ,
	td:nth-child(3) { 
		width: 90px; text-align: right; 
	}
	
	th { 
		font-weight: inherit;
		padding:  0;
		text-align: center;
		border-bottom: 1px dashed ;
	}
	tbody {
		tr:last-child td { padding-bottom: 0}
	}
	tfoot {
		.sup td {
			padding:  0;
			border-top: 1px dashed ;
		}
		.sup.p--0 td { padding-bottom: 0.2rem; }
	}
	
	.title { font-size: 1.5em; padding: 1.5 0; }
	
}


    @media screen and (max-width: 40em) {
    .text-title{
        color: var(--text-title);
    } 

    }   

  
   
`;

