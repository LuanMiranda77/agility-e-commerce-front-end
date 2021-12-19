import styled from "styled-components";

export const Container  = styled.div`

    //adicionar stylos

    .top{
        margin-top: 11rem;
    }

    .card{
        background: var(--white);
    }

    .label-frete{
        color: var(--secondary);
    }

    .label-valor{
        color: var(--text-title);
    }

    .text-title{
        color: var(--green);
        font-weight: bold;
    }

    /* CarouselDemo.css */
    .product-item .product-item-content {
        border: 1px solid var(--surface-d);
        border-radius: 3px;
        margin: .3rem;
        /* text-align: center; */
        /* padding: 2rem 0; */
    }

    .product-item .product-image {
        width: 80%;
        height: 200px;
        /* box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23); */
    }
    .preco{
        color: var(--secondary);
        font-size: 20px;
    }

    .p-rating .p-rating-icon.pi-star{
        color: #ffcb0c;
    }
@media screen and (max-width: 40em) {
    //adicionar o stylo responsivo
}

`;

