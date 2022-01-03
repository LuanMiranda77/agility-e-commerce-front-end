import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
:root{
  --background: #F2F2F2;
  --primary: #62A9A5;
  --secondary: #F47C1A;
  --orange:#F14F0D;
  --text-title: #949494;
  --green: #1ABC9C;
  --red: #E74C3C;
  --white: #FFFFFF;
  --blue:#2C73D2


}
*{
  margin:0;
  padding: 0;
  box-sizing: border-box;
}
html{
  @media (max-width: 1080px){
    font-size: 18px;
  }
  @media (max-width: 720px){
    font-size: 14px;
  }
}
body {
  background: var(--background);
  -webkit-font-smoothing: antialiased;
}
body, input, textarea, button{
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
}
h1,h2,h3,h4,h5,h6 strong{
  font-weight: 700;
}
button {
  cursor: pointer;
}
[disabled]{
  opacity: 0.6;
  cursor: not-allowed;
}
.react-modal-overlay{
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;

  display: flex;
  align-items: center;
  justify-content: center;

}

.react-modal-content{
  width: 100%;
  max-width: 70rem;
  background-color: var(--background);
  padding: 1.5rem;
  position: relative;
  border-radius: 0.24rem;
}
.react-modal-close{
  position: absolute;
  right: 1.5rem;
  top: 1rem;
  border: 0;
  transition: filter 0.2s;
  &:hover{
    filter:brightness(0.9);
  }
  @media (max-width: 720px){
    right: 3rem;
  }
  

}

`