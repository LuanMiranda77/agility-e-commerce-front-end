import styled from "styled-components";

export const Container = styled.div`

    //adicionar stylos
    .calendario{
        height: 35px;
        border: 1px solid black;
        border-color: var(--text-title);
        border-radius: 0.25rem;
    }

    .p-button {
        color: #ffffff;
        background: var(--primary);
        border: 1px solid var(--primary);
        padding: 0.5rem 1rem;
        font-size: 1rem;
        transition: background-color, 0.2s, color 0.2s, border-color 0.2s, box-shadow 0.2s;
        border-radius: 3px;
        &:hover {
            filter: brightness(0.9);
            background: var(--primary);
        }
    }

@media screen and (max-width: 40em) {
    //adicionar o stylo responsivo
}

`;

