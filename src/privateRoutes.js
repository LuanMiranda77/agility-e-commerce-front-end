import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from './services/auth';



const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
      )
    }
  />
);

export default PrivateRoute;