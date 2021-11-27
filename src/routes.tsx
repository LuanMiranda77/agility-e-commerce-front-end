import React from 'react';
import { Switch, Route } from 'react-router-dom';
//nossos imports
import Pedido from './pages/Pedido';
import Login  from './pages/Login';
import Produto  from './pages/Produto';
import {Notfound} from './pages/Notfound';
// import Route from './privateRoutes';
import Categoria from './pages/Categoria';
import Dashbord from './pages/Dashbord';


const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={Login}/>
      <Route path="/login" exact component={Login}/>
      <Route path="/produto" exact component={Produto}/>
      <Route path="/dashbord" exact component={Dashbord}/>
      <Route path="/categoria"exact component={Categoria} />
      <Route path="/pedido"component={ Pedido } />
      <Route component={Notfound}/>
    </Switch>

  );
}
export default Routes;

