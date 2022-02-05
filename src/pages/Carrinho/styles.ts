import styled from "styled-components";

export const Container  = styled.div`

    //adicionar stylos

    .top{
        margin-top: 11rem;
    }

    .title-top{
        margin-bottom: -30px;
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

    .img-lista {
        width: 69px;
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
        margin-right: 2rem;
        height: 69px;
        
    }
    .card{
        background: var(--white);
        padding: 0.5rem;
        margin-bottom: 1rem;
    }
    .p-inputnumber-input {
        flex: 1 1 auto;
        width: 3rem;
        text-align: center;
        font-weight: bold;
    }
@media screen and (max-width: 40em) {
    //adicionar o stylo responsivo
}

`;

