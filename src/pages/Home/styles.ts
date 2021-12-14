import styled from "styled-components";

export const Container  = styled.div`

    //adicionar stylos
    .banner-top{
        margin-top: 10rem;
    }

    .galleria-demo {
    .custom-indicator-galleria {
        .indicator-text {
            color: #e9ecef;
            cursor: pointer;
        }

        .p-highlight {
            .indicator-text {
                color: var(--primary-color);
            }
        }
    }
    
    }
    .card{
        background: var(--white);
        padding: 1rem;
        margin-bottom: 1rem;
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
    //lista de produtos
    .dataview-demo .p-dropdown {
    width: 14rem;
    font-weight: normal;
    }

    .dataview-demo .product-name {
        font-size: 1.2rem;
        font-weight: 700;
    }

    .dataview-demo .product-description {
        margin: 0 0 1rem 0;
    }

    .dataview-demo .product-category-icon {
        vertical-align: middle;
        margin-right: .5rem;
    }

    .dataview-demo .product-category {
        font-weight: 600;
        vertical-align: middle;
    }

    .dataview-demo .product-list-item {
        display: flex;
        align-items: center;
        padding: 1rem;
        width: 100%;
    }

    .dataview-demo .product-list-item img {
        width: 150px;
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
        margin-right: 2rem;
        height: 150px;
        
    }

    .dataview-demo .product-list-item .product-list-detail {
        flex: 1 1 0;
    }

    .dataview-demo .product-list-item .p-rating {
        margin: 0 0 .5rem 0;
    }

    .dataview-demo .product-list-item .product-price {
        font-size: 1.5rem;
        margin-bottom: .5rem;
        align-self: flex-end;
        font-weight: bold;
        color: var(--secondary);
    }

    .dataview-demo .product-list-item .product-list-action {
        display: flex;
        flex-direction: column;
    }

    .dataview-demo .product-list-item .p-button {
        margin-bottom: .5rem;
    }

    .dataview-demo .product-grid-item {
        margin: .5em;
        border: 1px solid var(--surface-border);
        padding: 1rem;
        
    }

    .dataview-demo .product-grid-item .product-grid-item-top,
        .dataview-demo .product-grid-item .product-grid-item-bottom {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .dataview-demo .product-grid-item img {
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
        margin: 2rem 0;
        width: 80%;
        height: 200px;
    }

    .dataview-demo .product-grid-item .product-grid-item-content {
        text-align: center;
    }

    .dataview-demo .product-grid-item .product-price {
        font-size: 2rem;
        font-weight: bold;
        color: var(--secondary);
    }

    .text-esgotado{
        background: #d3d3d3;
        border-radius: 0.25rem;
        height: 35px;
    }

    .frete-gratis{
        background: #32cd32;
        border-radius: 0.25rem;
        color: black;
        font-weight: bold;
        padding: 0.2rem;
        opacity : 0.5;
    }

@media screen and (max-width: 40em) {
    //adicionar o stylo responsivo
}

`;

