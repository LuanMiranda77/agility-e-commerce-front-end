import styled from "styled-components";

export const Container  = styled.div`
    //adicionar stylos
    position:absolute;
    bottom:0;
    width:100%;
    
    .footer-boby{
        background: var(--primary);
        color: white;
    }
    .text-body{
        text-decoration: none;
        cursor: pointer;
        color: white;
    }
    .footer-bottom{
        background: #949494;
        color: white;
    }
    .link-store{
        margin-left: -2rem;
    }

@media screen and (max-width: 40em) {
    //adicionar o stylo responsivo
    .link-store{
        margin-left: -0.25rem;
    }
}

`;

