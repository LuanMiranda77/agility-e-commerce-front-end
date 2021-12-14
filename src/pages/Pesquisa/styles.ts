import styled from "styled-components";

export const Container  = styled.div`

    //adicionar stylos
    .top{
        margin-top: 10rem;
    }
    .card{
        background: white;
    }

    .p-rating .p-rating-icon.pi-star{
        color: #ffcb0c;
        &:hover{
            color: #ffcb0c;
        }
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

    .p-inputnumber-input {
        flex: 1 1 auto;
        width: 100%;
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
        font-size: 12px;
    }

    .estrela{
        cursor: pointer;
    }

@media screen and (max-width: 40em) {
    //adicionar o stylo responsivo
}

`;

