import styled from 'styled-components';

export const Container = styled.header`
  background: var(--white);
  margin-top: 6%;
  margin-left: 15%;
  border-radius: 5px;
  padding: 0 3rem 1rem;
  width:70%;
  


  img{
    @media (max-width: 1080px){
        width:50%;
  }
    @media (max-width: 720px){
        width:70%;
  }
    width:25%;
    margin-left: 35%;
    margin-top: 5%;
   
  }

  h3{
    text-align: center;
    margin-bottom:  2rem ;
    color: var(--text-title);
    /* padding: 3 1rem 10rem; */
   }
   .div-link{
       display:flex;
       margin-top: 1rem;
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
   }
   label{
       color: var(--green);
   }

   .google{
    margin-top: 26%;
    background: -webkit-gradient(linear,right top,left top,color-stop(70%,var(--purple-600)),color-stop(70%,var(--purple-700)));
    width: 100%;
    font-weight: bold;
    bottom:1rem;
    transition: background-position .5s ease-out;
    &:hover {
        background: -webkit-gradient(linear,right top,left top,color-stop(20%,var(--purple-600)),color-stop(78%,var(--purple-700)));
        filter: brightness(0.9)
        
    }
   

  }
  .facebook{
    padding-left: 1rem!important;
    padding-right: 1rem!important;
    background: -webkit-gradient(linear,right top,left top,color-stop(70%,var(--indigo-600)),color-stop(70%,#2c397f));
    width:100%;
    font-weight: bold;
}
   
   .p-button-success{
       color: var(--white);
       font-style: normal;
       font-weight: bold;
       font-size: 18px;
       line-height: 21px;
       text-align: center;
       border:0;
       background: var(--green);
       height:35px;
       width:100%;
       padding:0 1rem;
       border-radius: 3px;
       transition: 0.2s;
        &:hover {
            filter: brightness(0.9);
        }

       
  } 
   
`


