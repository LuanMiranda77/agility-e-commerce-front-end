import styled from "styled-components";

export const Container = styled.div`
    background: var(--background);

    .card{
        background: var(--white);
        border-width: 3px;
        border-style: solid;
        border-left: 0px;
        border-right: 0px;
        border-bottom: 0px;
        border-radius: 0.25rem;
        border-color: var(--primary);

        .label-title{
            color: var(--text-title);
        }
    }

    

    .content{
        background: var(--back-due);
    }

    .title{
        font-size: 2em;
        color: white;
    }

    .center{
        margin:0 auto;
        justify-content: center;
        padding: 0;
    }
    .img-cartao{
        width: 30%;
    }

    .resumo-ped{
        background: #ADD8E6;
        border-width: 3px;
        border-style: solid;
        border-left: 0px;
        border-right: 0px;
        border-bottom: 0px;
        border-radius: 0.25rem;
        border-color: var(--secondary);
    }

    .label-codigo{
        color: var(--primary);
        background: #D3D3D3;
        border: 0;
        font-size: 1rem;
    }
`;
