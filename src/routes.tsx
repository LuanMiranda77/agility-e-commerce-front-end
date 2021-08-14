import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { Login } from './pages/Login';
import { Produto } from './pages/Produto';


const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={Login}/>
      <Route path="/produto"component={Produto} />
    </Switch>

  );
}
export default Routes;

