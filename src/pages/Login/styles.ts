import styled from 'styled-components';

export const Container = styled.header`
  background: var(--white);
  align-items: center;
  margin: 5% auto;
  width:58%;
  border-radius: 5px;
  padding: 0 1rem 1rem;
 
    @media (max-width: 720px){
        width:80%;
  }

  img{
    width:30%;
    margin: 5%  35% auto;
    margin-bottom: 2rem;
    @media (max-width: 720px){
        width:70%;
        margin: 5%  20% auto;
  }
   
   
  }

  h3{
    text-align: center;
    margin-bottom:  2rem ;
    color: var(--text-title);
    /* padding: 3 1rem 10rem; */
   }
   .p-fluid{
     margin-left: 10%;

     @media (max-width: 720px){
        width:70%;
        margin: 5%  20% auto;
  }
   }

   .div-link{
       margin-top: 1rem;
       /* justify-content: baseline; */
       font-weight: bold;
       @media (max-width: 720px){
        font-size: 10px;
       }

       a{
        @media (max-width: 720px){
        padding: 0 0.4rem;
       }
           padding: 0 1rem;
           text-decoration: none;

       }


       span{
           color:var(--green)
       }

       .span-link{
        color:var(--secondary)
       }

   }
   .google{
     margin-top: 10%;
     margin-bottom: 2rem;
   }
   
   label{
       color: var(--green);
   }

`


