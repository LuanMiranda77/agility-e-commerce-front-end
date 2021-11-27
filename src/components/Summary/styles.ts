import styled from "styled-components";

export const Container  = styled.div`
margin: 0 0.5rem;
.card{
    margin-top:-1rem;

    label{
    color: var(--primary);
    font-weight: bold;
    font-size: 28px;
 }
}

.icon{
    width:"100%";
    float:right;
}


.label-title{
 margin-top: -1.8rem;
 font-weight: bold;
 color: var(--white);
 border: 0;
 border-end-end-radius: 0.3rem;
 border-end-start-radius: 0.3rem;
 padding:0.5rem;
}
.primary {
 background: var(--primary);

 span{
    color: var(--primary);
 }
}


@media screen and (max-width: 40em) {
    //adicionar o stylo responsivo
     margin: 0;
     width: 100%;
     padding-bottom: 2rem;
}

`;

