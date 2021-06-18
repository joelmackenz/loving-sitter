import { MuiThemeProvider } from '@material-ui/core';
import { BrowserRouter } from 'react-router-dom';

import { theme } from './themes/theme';
import { AuthProvider } from './context/useAuthContext';
import { SocketProvider } from './context/useSocketContext';
import { SnackBarProvider } from './context/useSnackbarContext';
import { UserProvider } from './context/useUserContext';
import Routes from './Routes';

function App(): JSX.Element {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <SnackBarProvider>
          <AuthProvider>
            <SocketProvider>
              <UserProvider>
                <Routes />
              </UserProvider>
            </SocketProvider>
          </AuthProvider>
        </SnackBarProvider>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
