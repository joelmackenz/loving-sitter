import { Route, Redirect, Switch } from 'react-router-dom';

import Login from './pages/Login/Login';
import Signup from './pages/SignUp/SignUp';
import Dashboard from './pages/Dashboard/Dashboard';
import ProtectedRoute from './ProtectedRoute';

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={Signup} />
      <ProtectedRoute exact path="/dashboard" component={Dashboard} />
      <Route path="*">
        <Redirect to="/login" />
      </Route>
    </Switch>
  );
};

export default Routes;
