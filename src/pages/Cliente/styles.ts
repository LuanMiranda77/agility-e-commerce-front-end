import styled from "styled-components";

export const Container  = styled.div`

    //adicionar stylos
    margin: 5rem 2rem 2rem;
    label{
        color: var(--green);
        font-weight: bold;
    }

    .card{
        background: white;
        border-radius: 0.3rem;
    }

    .p-radiobutton .p-radiobutton-box.p-highlight {
        border-color: var(--secondary);
        background: var(--secondary);
        &:hover {
            filter: brightness(0.9);
            background: var(--primary);
        }
    }

@media screen and (max-width: 40em) {
    //adicionar o stylo responsivo
}

`;

