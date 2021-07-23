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


}
*{
  margin:0;
  padding: 0;
  box-sizing: border-box;
}
html{
  @media (max-width: 1080px){
    font-size: 93.75%;
  }
  @media (max-width: 720px){
    font-size: 87.5%;
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
`