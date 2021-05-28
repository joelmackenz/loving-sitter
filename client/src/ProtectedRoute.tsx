import { Route, Redirect, RouteProps, RouteComponentProps } from 'react-router-dom';
import { useAuth } from './context/useAuthContext';

const ProtectedRoute = ({ children, ...routeProps }: RouteProps) => {
  const { loggedInUser } = useAuth();
  return (
    <Route
      {...routeProps}
      render={({ location }: RouteComponentProps) =>
      loggedInUser ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  )
}

export default ProtectedRoute