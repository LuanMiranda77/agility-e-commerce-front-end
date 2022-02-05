import styled from "styled-components";

export const Container  = styled.div`

    //adicionar stylos
    margin: 1rem;
    
    .top{
        margin-top: 1rem;
    }

    .card{
        margin-top:-6rem;
        background: var(--white);
        padding: 2rem;
        border-radius: 0.3rem;
    }

    .card-amarelo{
        height: 50%;
        background: #FFEC8B;
        padding: 8rem;
        border-radius: 0.3rem;
        color: #27408B;
    }

    label{
        color: var(--green);
        font-weight: bold;
    }

    .title-label{
        color: var(--text-title);
        font-size: 30px;
    }
    .lable-lista{
        color: var(--text-title);
    }
    .center{
        align-items: center;
        justify-content: center;
    }
    .style-div{
        background: #d3d3d3d3;
        padding: 1rem;
        border-radius: 0.3rem;
    }

    

@media screen and (max-width: 40em) {
    //adicionar o stylo responsivo
}

`;


