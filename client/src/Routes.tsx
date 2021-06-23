import { Route, Redirect, Switch } from 'react-router-dom';

import Login from './pages/Login/Login';
import Signup from './pages/SignUp/SignUp';
import Settings from './pages/Settings/Settings';
import Messages from './pages/Messages/index';
import ProtectedRoute from './ProtectedRoute';
import Main from './pages/Main/Main';
import AuthNavbar from './components/AuthNavbar/Navbar';
import { useAuth } from './context/useAuthContext';
import ProfileListings from './pages/ProfileListings/ProfileListings';

const Routes = (): JSX.Element => {
  const { loggedInUser } = useAuth();
  return (
    <>
      {loggedInUser && <AuthNavbar />}
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <ProtectedRoute exact path="/dashboard" component={ProfileListings} />
        <ProtectedRoute exact path="/settings" component={Settings} />
        <ProtectedRoute exact path="/messages" component={Messages} />
        <Route path="*">
          <Redirect to="/login" />
        </Route>
      </Switch>
    </>
  );
};

export default Routes;
