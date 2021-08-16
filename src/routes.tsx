import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { Login } from './pages/Login';
import { Produto } from './pages/Produto';
import {Notfound} from './pages/Notfound';


const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={Login}/>
      <Route path="/produto"component={Produto} />
      <Route component={Notfound} />
    </Switch>

  );
}
export default Routes;

