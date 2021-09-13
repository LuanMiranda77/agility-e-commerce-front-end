import React from 'react';
import { Switch, Route } from 'react-router-dom';
//nossos imports
import Login  from './pages/Login';
import Produto  from './pages/Produto';
import {Notfound} from './pages/Notfound';
import PrivateRoute from './privateRoutes';
import Categoria from './pages/Categoria';


const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={Produto}/>
      <Route path="/login" exact component={Login}/>
      <Route path="/produto"component={Produto} />
      <PrivateRoute path="/categoria"component={Categoria} />
      <Route component={Notfound}/>
    </Switch>

  );
}
export default Routes;

