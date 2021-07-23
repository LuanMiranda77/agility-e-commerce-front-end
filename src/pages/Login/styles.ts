import styled from 'styled-components';

export const Container = styled.header`
  background: var(--white);
  margin-left: 25%;
  margin-top: 6%;
  border-radius: 5px;
  height: 10%;
  padding: 0 1rem 1rem;
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: baseline;
  h3{
    text-align: center;
    margin-bottom:  2rem ;
    color: var(--text-title);
    /* padding: 3 1rem 10rem; */
   }
   .div-master{
       margin-bottom: 1rem;
   }
   .div-link{
       display:flex;
       margin-top: 0.5rem;
       /* justify-content: baseline; */
       font-weight: bold;

       a{
           padding: 0 1.5rem;
           text-decoration: none;
       }


       span{
           color:var(--green)
       }

       .span-link{
        color:var(--secondary)
       }

   }
   input{ 
       height:35px;
       width:309px;
       padding:0 1rem;
       /* border-top:  0;
       border-left:  0;
       border-right:  0; */
   }
   label{
       color: var(--green);
   }
   .button-enter{
       color: var(--white);
       font-style: normal;
       font-weight: bold;
       font-size: 18px;
       line-height: 21px;
       text-align: center;
       border:0;
       background: var(--green);
       height:35px;
       width:309px;
       padding:0 1rem;
       border-radius: 3px;
       transition: 0.2s;
        &:hover {
            filter: brightness(0.9)
        }
   }
`;
export const Content = styled.div`
  padding: 0 1rem 10rem;
  display: flexbox;
  align-items: center;
  justify-content: baseline;

  .button-sem-fundo{  
    /* background: var(--white); */
    color: var(--text-title);
    margin-bottom: 2rem;
    border: 1rem;
    border-width: medium;
    border-color: var(--text-title);
  }
`;


