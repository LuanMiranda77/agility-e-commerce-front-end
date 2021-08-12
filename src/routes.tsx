import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { Login } from './pages/Login';
import { Produto } from './pages/Produto';
import { Dashbord } from './pages/Dashbord';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={Login}/>
      <Route path="/produto"component={Produto} />
      <Route path="/teste"component={Dashbord} />
    </Switch>

  );
}
export default Routes;

