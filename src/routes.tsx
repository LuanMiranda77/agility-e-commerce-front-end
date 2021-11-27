import React from 'react';
import { Switch, Route } from 'react-router-dom';
//nossos imports
import Pedido from './pages/Pedido';
import Login  from './pages/Login';
import Produto  from './pages/Produto';
import {Notfound} from './pages/Notfound';
import PrivateRoute from './privateRoutes';
import Categoria from './pages/Categoria';
import Dashbord from './pages/Dashbord';
import Checkout from './pages/Checkout';


const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={Produto}/>
      <Route path="/login" exact component={Login}/>
      <Route path="/produto" exact component={Produto}/>
      <Route path="/dashboard" exact component={Dashbord}/>
      <PrivateRoute path="/categoria"exact component={Categoria} />
      <PrivateRoute path="/pedido"component={ Pedido } />
      <Route path="/checkout" component={Checkout}/>
      <Route component={Notfound}/>
    </Switch>

  );
}
export default Routes;

