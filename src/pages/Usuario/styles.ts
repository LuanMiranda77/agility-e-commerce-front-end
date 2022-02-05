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
        color: var(--text-title)
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

