import styled from "styled-components";

export const Container = styled.div`

.p-button-success{
  color: var(--white);
  font-weight: bold;
  font-size: 18px;
  border:0;
  background: var(--green);
  height:35px;
  border-radius: 3px;
  transition: 0.2s;
  &:hover {
      filter: brightness(0.6);
  }
  }
  .p-button-danger{
    color: var(--white);
    font-weight: bold;
    font-size: 18px;
    border:0;
    background: var(--red);
    height:35px;
    border-radius: 3px;
    transition: 0.2s;
    &:hover {
        filter: brightness(0.9);
    }
  }

  .p-button-warning{
    color: var(--white);
    font-weight: bold;
    font-size: 18px;
    border:0;
    background: var(--secondary);
    height:35px;
    border-radius: 3px;
    transition: 0.2s;
    &:hover {
        filter: brightness(0.9);
    }
  }
  
  
  
`