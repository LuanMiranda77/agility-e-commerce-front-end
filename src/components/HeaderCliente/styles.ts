import styled from "styled-components";

export const Container  = styled.div`

    //adicionar stylos
    background: var(--white);
    
    .text-top{
        color: var(--text-title);
        text-decoration: none;
        cursor: pointer;
    }

    .div-footer{
        background: var(--primary);
    }
    .icon-sacola{
        width: 3.2rem;
       
    }
    .quant-sacola{
        color: var(--white);
        /* margin-top: -10rem;
        margin-left: -2rem; */
    }
    .label-div-enter{
        display: block;
        font-size: 14px;

    }
    .button-categ{
        background: var(--primary);
        border:0;
        height:35px;
        color: white;
        font-size: 14px;

        
    }
    .p-dropdown .p-dropdown-label.p-placeholder {
        color: white;
    }
    .p-dropdown .p-dropdown-trigger{
        color: white;
    }
    .center{
        margin:0 auto;
        justify-content: center;
        padding: 0;
    }

@media screen and (max-width: 40em) {
    //adicionar o stylo responsivo
}

`;

