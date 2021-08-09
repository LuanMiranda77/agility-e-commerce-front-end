import styled from "styled-components";

export const Container  = styled.div`

    background: var(--background);
    label{
        color: var(--text-title);
        margin-top: 0.5rem;
        margin-left: 0.5rem;
        font-size: 18px;
        font-weight: bold;
    }

    .card { 
        background: var(--white);
        margin: 0.5rem auto;
       
    }
    /* DataTableDemo.css */

.datatable-crud-demo .table-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.datatable-crud-demo .product-image {
    width: 100px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}

.datatable-crud-demo .p-dialog .product-image {
    width: 150px;
    margin: 0 auto 2rem auto;
    display: block;
}

.datatable-crud-demo .confirmation-content {
    display: flex;
    align-items: center;
    justify-content: center;
}




`;