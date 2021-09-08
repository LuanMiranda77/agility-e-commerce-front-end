import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login  from './pages/Login';
import Produto  from './pages/Produto';
import {Notfound} from './pages/Notfound';
import PrivateRoute from './privateRoutes';


const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={Login}/>
      <Route path="/login" exact component={Login}/>
      <PrivateRoute path="/produto"component={Produto} />
      <Route component={Notfound} />
    </Switch>

  );
}
export default Routes;

