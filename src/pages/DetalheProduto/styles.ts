import styled from "styled-components";

export const Container  = styled.div`

    //adicionar stylos
    .top{
        margin-top: 11rem;
    }

    .card{
     background: var(--white);
    }

    .img-pequena{
        width: 100%;
        height: 4.8rem;
    }
    
    .img-grande{
        width: 100%;
        height: 25rem;
    }
    .p-rating .p-rating-icon.pi-star{
        color: #ffcb0c;
    }
    .text-compartilha{
        margin-top: -10rem;
    }

    .curson-pointer{
        cursor: pointer;
    }

@media screen and (max-width: 40em) {
    //adicionar o stylo responsivo
}

`;

