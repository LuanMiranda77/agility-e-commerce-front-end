import React, { Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
//nossos imports
import DetalheProduto from './pages/DetalheProduto';
import Pesquisa from './pages/Pesquisa';
import Home from './pages/Home';
import Pedido from './pages/Pedido';
<<<<<<< HEAD
import Login  from './pages/Login';
import Produto  from './pages/Produto';
import {Notfound} from './pages/Notfound';
// import Route from './privateRoutes';
=======
import Login from './pages/Login';
import Produto from './pages/Produto';
import { Notfound } from './pages/Notfound';
import PrivateRoute from './privateRoutes';
>>>>>>> test
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
      <Route path="/detalheProduto/:id"component={ DetalheProduto } />
          <Route path="/pesquisa/:filter" component={Pesquisa} />
          <Route path="/home" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/produto" component={Produto} />
          <Route path="/dashboard" component={Dashbord} />
          <Route path="/categoria" component={Categoria} />
          <Route path="/pedido" component={Pedido} />
          <Route path="/checkout" component={Checkout} />
          <Route component={Notfound} />
        </Switch>
      </Suspense>
    </Router>
  );
}
export default Routes;

