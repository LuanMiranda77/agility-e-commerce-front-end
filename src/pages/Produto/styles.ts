import styled from "styled-components";

export const Container  = styled.div`

    img{
        max-width: 4rem;
        max-height: 8rem;
    }

    label{
        display: flex;
        color: var(--text-title);
        margin-top: 0.5rem;
        margin-left: 0.5rem;
        font-size: 18px;
        font-weight: bold;
    }

    .card { 
        position: fixed;
        width: 100%;
        background: var(--white);
        margin-top: -12.5rem;
        z-index: 12;
       
    }
    .table{
        margin-top: 17rem;
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
        width: 100%;
        float: left;
        clear: left;
        border: 0 none;
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
    label{
        color: var(--primary);
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
   
`;