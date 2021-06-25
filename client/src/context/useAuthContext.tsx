import { useState, useContext, createContext, FunctionComponent, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthApiData, AuthApiDataSuccess } from './interface/AuthApiData';
import { User } from './interface/User';
import loginWithCookies from '../helpers/APICalls/loginWithCookies';
import logoutAPI from '../helpers/APICalls/logout';

interface IAuthContext {
  loggedInUser: User | null | undefined;
  updateLoginContext: (data: AuthApiDataSuccess, redirect?: string) => void;
  logout: () => void;
  updateLoginFields: (dogSitter: boolean) => void;
}

export const AuthContext = createContext<IAuthContext>({
  loggedInUser: undefined,
  updateLoginContext: () => null,
  logout: () => null,
  updateLoginFields: () => null,
});

export const AuthProvider: FunctionComponent = ({ children }): JSX.Element => {
  // default undefined before loading, once loaded provide user or null if logged out
  const [loggedInUser, setLoggedInUser] = useState<User | null | undefined>();
  const history = useHistory();

  const updateLoginFields = useCallback((dogSitter: boolean) => {
    setLoggedInUser((prevState) => {
      if (prevState !== null && prevState !== undefined) {
        return {
          ...prevState,
          isDogSitter: dogSitter,
        };
      }
    });
  }, []);

  const updateLoginContext = useCallback(
    (data: AuthApiDataSuccess, redirect?: string | undefined) => {
      setLoggedInUser(data.user);
      if (redirect !== undefined) {
        history.push(redirect);
      }
    },
    [history],
  );

  const logout = useCallback(async () => {
    // needed to remove token cookie
    await logoutAPI()
      .then(() => {
        setLoggedInUser(null);
        history.push({
          pathname: '/login',
          state: { previousPath: location.pathname },
        });
      })
      .catch((error) => console.error(error));
  }, [history]);

  // use our cookies to check if we can login straight away
  useEffect(() => {
    const checkLoginWithCookies = async () => {
      await loginWithCookies().then((data: AuthApiData) => {
        if (data.success) {
          updateLoginContext(data.success);
        } else {
          // don't need to provide error feedback as this just means user doesn't have saved cookies or the cookies have not been authenticated on the backend
          setLoggedInUser(null);
          history.push({
            pathname: '/',
            state: { previousPath: location.pathname },
          });
        }
      });
    };
    checkLoginWithCookies();
  }, [updateLoginContext, history]);
  return (
    <AuthContext.Provider value={{ loggedInUser, updateLoginContext, logout, updateLoginFields }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): IAuthContext {
  return useContext(AuthContext);
}
