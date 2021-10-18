import styled from "styled-components";

export const Container = styled.div`
  margin-top: 7rem;

  img{
        max-width: 4rem;
        max-height: 5rem;
  }

.title{
  margin:0 8rem;
  color: var(--secondary);
  font-size: 22px;
  justify-content: center;
  padding-top: 2rem;
  
}
.card-total{
  background: var(--white);
  text-align: left;
}

.divider{
  margin-top: -1rem;
  padding-bottom: 2rem;
}
.total-style{
  margin-top: 3rem;
  font-size: 50px;
  color: var(--green);
  text-align:center;
}

 .center{
  margin:0 auto;
  justify-content: center;
  padding: 0;
  
 }
 /* CarouselDemo.css */

.carousel-demo .product-item .product-item-content {
    border: 1px solid var(--surface-d);
    border-radius: 3px;
    margin: .3rem;
    text-align: center;
    padding: 2rem 0;
}

.carousel-demo .product-item .product-image {
    width: 50%;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}
   

 @media screen and (max-width: 40em) {
    margin-left: -1rem;
      .center{
        margin-left: 2rem;
        margin-right: 1rem;
        
      }
      .total-style{
        margin-left: 2rem;
        width: 89%;
        font-size: 50px;
        color: var(--green);
        margin-right: 1rem;
      }
      .title{
        margin:0 8rem;
        margin-left: 2rem;
        width: 89%;
        font-size: 22px;
      }
  }
 

`;