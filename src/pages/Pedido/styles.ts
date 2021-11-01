import styled from "styled-components";

export const Container  = styled.div`

    img{
        max-width: 4rem;
        max-height: 5rem;
    }

    /* label{
        display: flex;
        color: var(--text-title);
        margin-top: 0.5rem;
        margin-left: 0.5rem;
        font-size: 18px;
        font-weight: bold;
    } */
    .table{
        margin-top: 50rem;
    }
    .diveder{
        margin-top: -1rem;
        margin-bottom: 0.5rem;
        @media screen and (max-width: 40em) {
            margin: 0;
        }
    }

    .button-calendario{
        margin-top: -1.4rem;
        padding-bottom: 0;
        /* margin:0; */
        float: right;
        text-align: right;
        /* display: table; */
        /* margin-left:-1rem; */
    }
    .react-modal-voltar{
        background: #fff;
        border: 0;
    }

    

    

    .card { 
        position: fixed;
        width: 100%;
        background: var(--white);
        margin-top: -9.4rem;
        z-index: 12;
       
    }
    .table{
        margin-top: 14rem;
    }
    /* DataTableDemo.css */
    .but-add{
        width:"100%";
        float: right;
    }
    .table-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .product-image {
        width: 100px;
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    }

    .p-dialog .product-image {
        width: 150px;
        margin: 0 auto 2rem auto;
        display: block;
    }

    .confirmation-content {
        display: flex;
        align-items: center;
        justify-content: center;
    }

 .MuiDialog-root{
    background: var(--background);
    width: 100%;
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
    }

    .lowstock {
        font-weight: 700;
        color: #FFA726;
    }

    .datatable-style-demo .instock {
        font-weight: 700;
        color: #66BB6A;
    }

@media screen and (max-width: 40em) {
    .table-header{
        margin-top: 6rem;
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

    .pesquisar{
        width: 24.5rem;
        margin-left: 1.5rem
    }
    .buttonAdd{
        margin-left: 1.5rem;
    }
    .buttonAction{
        display: flex;
    }
    .buttonAction .teste{
        margin-left: 18rem;
    }
}



`;



export const FormControl = styled.form`
    button{
        background: 'ffff';
    }

    .product-image {
        width: 100px;
        height: 100px;
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    }

    .datatable-responsive-demo .p-datatable-responsive-demo .p-datatable-tbody > tr > td .p-column-title {
        display: none;
    }

    label{
        color: var(--primary);
    }

    .button-status{
        background: #fff;
        border: 0;
        i{
            font-size: 30px;
            color: var(--text-title);
        }
    }

    .card{
        background: var(--white);
        border-radius: 0.24rem;
        margin-top: 1.8rem;
    }
    .p-button-primary{
        background: var(--white);
        border: 0;
        height: 8rem;
        width: 8rem;
        color: var(--blue);
        
        text-align: left;
    }
    .but-save{
        width:"100%";
        float:right;
    }
    .button-action{
        max-height: 40px;
        color: var(--white);
        font-weight: bold;
        border-radius: 0.5rem;
        margin-top: -10px;
        margin-bottom: 20px;
    }

    /* TimelineDemo.css */

    .timeline-demo .custom-marker {
        display: flex;
        width: 2rem;
        height: 2rem;
        align-items: center;
        justify-content: center;
        color: #ffffff;
        border-radius: 50%;
        z-index: 1;
    }

    .timeline-demo .p-timeline-event-content,
    .timeline-demo .p-timeline-event-opposite {
        line-height: 1;
    }


    @media screen and (max-width: 40em) {

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

    .button-action{
        max-height: 40px;
        color: var(--white);
        font-weight: bold;
        border-radius: 0.5rem;
        margin-right: 10px;
    }

    .timeline-demo .customized-timeline .p-timeline-event:nth-child(even) {
        flex-direction: row !important;
    }
    .timeline-demo .customized-timeline .p-timeline-event:nth-child(even) .p-timeline-event-content {
        text-align: left !important;
    }
    .timeline-demo .customized-timeline .p-timeline-event-opposite {
        flex: 0;
    }
    .timeline-demo .customized-timeline .p-card {
        margin-top: 1rem;
    }
  
  }
   
`;