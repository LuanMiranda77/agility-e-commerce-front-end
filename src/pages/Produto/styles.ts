import styled from "styled-components";

export const Container  = styled.div`

    img{
        max-width: 4rem;
        max-height: 8rem;
    }

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

.teste{
    background: var(--background);
    width: 100%;
}

.react-modal-content{
        max-width: 20rem;
    }




`;

export const FormControl = styled.form`

    h3{
        color: var(--text-title);
    }
    label{
        color: var(--text-title);
    }
    .divider{
        margin-top: -1rem;
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