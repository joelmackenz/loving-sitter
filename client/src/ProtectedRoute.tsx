import { Route, Redirect, RouteProps, RouteComponentProps } from 'react-router-dom';
import { useAuth } from './context/useAuthContext';

const ProtectedRoute = ({ children, component: Component, ...routeProps }: RouteProps): JSX.Element => {
  const { loggedInUser } = useAuth();
  return (
    <Route
      {...routeProps}
      render={({ location, ...restProps }: RouteComponentProps) =>
        loggedInUser && children ? (
          children
        ) : loggedInUser && Component ? (
          <Component {...restProps} location={location} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default ProtectedRoute;
