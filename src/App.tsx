import { Login } from "./pages/Login";
import { GlobalStyle } from "./style/global";
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import PrimeReact from 'primereact/api';

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import { ButtonBase } from "./components/ButtonBase";


export function App() {
  // active ripple effect
  PrimeReact.ripple = true;



  return (
    <div>
      {/* <Dashboard /> */}
      <Login />
      <GlobalStyle />
    </div>
  );
}
