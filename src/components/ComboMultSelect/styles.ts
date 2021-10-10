import styled from "styled-components";

export const Container  = styled.div`

    .multiselect-custom .p-multiselect-label:not(.p-placeholder):not(.p-multiselect-items-label) {
        padding-top: .25rem;
        padding-bottom: .25rem;
        z-index: 1500;
    }

    .multiselect-custom .country-item-value {
        padding: .25rem .5rem;
        border-radius: 3px;
        display: inline-flex;
        margin-right: .5rem;
        background-color: var(--green);
        color: var(--white);
        z-index: 1500;
    }

    .multiselect-custom .country-item-value img.flag {
        width: 17px;
        z-index: 1500;
    }
    .p-multiselect-panel{
        z-index: 1500;
    }
    .p-component{
        z-index: 1500;
    }
    .p-connected-overlay-enter-done{
        z-index: 1500;
    }

@media screen and (max-width: 40em) {
    //adicionar o stylo responsivo
}

`;

