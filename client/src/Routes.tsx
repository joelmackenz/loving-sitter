import { Route, Redirect, Switch } from 'react-router-dom';

import { useAuth } from './context/useAuthContext';
import Login from './pages/Login/Login';
import Signup from './pages/SignUp/SignUp';
import Dashboard from './pages/Dashboard/Dashboard';
import ProtectedRoute from './ProtectedRoute';

const Routes = () => {
    const { loggedInUser } = useAuth();
    return (
        <Switch>
            <Route exact path="/login" render={() => loggedInUser ? <Dashboard /> : <Login />} />
            <Route exact path="/signup" render={() => loggedInUser ? <Dashboard /> : <Signup />} />
            <ProtectedRoute exact path="/dashboard">
                <Dashboard />
            </ProtectedRoute>
            <Route path="*">
                <Redirect to="/login" />
            </Route>
        </Switch>
    );
};

export default Routes;
