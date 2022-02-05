import styled from "styled-components";

export const Container  = styled.div`

    //adicionar stylos
    margin: 1rem;
    .card{
        background: var(--white);
    }

    label{
        color: var(--green);
        font-weight: bold;
    }

    .title-label{
        color: var(--text-title);
        font-size: 30px;
    }

    .top{
        margin-top: 5rem;
    }

@media screen and (max-width: 40em) {
    //adicionar o stylo responsivo
}

`;

