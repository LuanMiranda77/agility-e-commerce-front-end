import { Login } from "./pages/Login";
import { GlobalStyle } from "./style/global";
import PrimeReact from 'primereact/api';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

import { BrowserRouter } from "react-router-dom";
import Routes from "./routes";

export function App() {
  // active ripple effect
  PrimeReact.ripple = true;
  return (
   <BrowserRouter>
      <Routes/>
      <GlobalStyle/>
   </BrowserRouter>
  )
}
