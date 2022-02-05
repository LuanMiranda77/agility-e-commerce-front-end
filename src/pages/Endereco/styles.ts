import styled from "styled-components";

export const Container  = styled.div`

    //adicionar stylos
    margin: 1rem;
    .card{
        background: var(--white);
    }

    /* label{
        color: var(--green);
        font-weight: bold;
    } */

    .title-label{
        color: var(--text-title);
        font-size: 30px;
    }
    .lable-lista{
        color: var(--text-title);
    }

    .top{
        margin-top: 5rem;
    }

    

@media screen and (max-width: 40em) {
    //adicionar o stylo responsivo
}

`;

export const FormControl = styled.form`

    label{
        color: var(--green);
        font-weight: bold;
    }
    
   .lable-lista{
        color: var(--text-title);
        font-weight: bold;
    }

    .card{
        background: var(--white);
    }
   
`;


