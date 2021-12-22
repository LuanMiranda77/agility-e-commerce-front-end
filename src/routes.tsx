import React, { Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
//nossos imports
import DetalheProduto from './pages/DetalheProduto';
import Carrinho from './pages/Carrinho';
import Pesquisa from './pages/Pesquisa';
import Home from './pages/Home';
import Pedido from './pages/Pedido';
import Login from './pages/Login';
import Produto from './pages/Produto';
import { Notfound } from './pages/Notfound';
import PrivateRoute from './privateRoutes';
import Categoria from './pages/Categoria';
import Dashbord from './pages/Dashbord';
import Checkout from './pages/Checkout';
import { CircularProgress } from '@material-ui/core';


const Routes: React.FC = () => {
  return (
    <Router>
      <Suspense fallback={<div className='p-flex p-text-center p-mt-5 p-t-5'><CircularProgress /></div>}>
        <Switch>
          <Route path="/" exact component={Login} />
      <PrivateRoute path="/detalheProduto/:id"component={ DetalheProduto } />
          <PrivateRoute path="/carrinho" component={Carrinho} />
          <PrivateRoute path="/pesquisa/:filter" component={Pesquisa} />
          <PrivateRoute path="/home" component={Home} />
          <Route path="/login" component={Login} />
          <PrivateRoute path="/produto" component={Produto} />
          <PrivateRoute path="/dashboard" component={Dashbord} />
          <PrivateRoute path="/categoria" component={Categoria} />
          <PrivateRoute path="/pedido" component={Pedido} />
          <PrivateRoute path="/checkout" component={Checkout} />
          <Route component={Notfound} />
        </Switch>
      </Suspense>
    </Router>
  );
}
export default Routes;

