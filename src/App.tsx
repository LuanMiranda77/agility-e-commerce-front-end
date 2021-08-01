import { Login } from "./pages/Login";
import { GlobalStyle } from "./style/global";
import PrimeReact from 'primereact/api';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import { HeaderAdmin } from "./components/HeaderAdmin";
import { ButtonBase } from "./components/ButtonBase";
import { InputSearch } from "./components/InputSearch";
import { ButtonRedeSociais } from "./components/ButtonRedeSociais";
import { InputGroup } from "./components/InputGroup";



export function App() {
  // active ripple effect
  PrimeReact.ripple = true;



  return (
    <div>
      {/* <Dashboard /> */}
      <HeaderAdmin></HeaderAdmin>
      <Login/>
      <GlobalStyle />
    </div>
  );
}
