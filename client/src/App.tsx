import { MuiThemeProvider } from '@material-ui/core';
import { BrowserRouter } from 'react-router-dom';

import { theme } from './themes/theme';
import { AuthProvider } from './context/useAuthContext';
import { SocketProvider } from './context/useSocketContext';
import { SnackBarProvider } from './context/useSnackbarContext';
import { UserProvider } from './context/useUserContext';
import { MessageProvider } from './context/useMessageContext';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import Routes from './Routes';

function App(): JSX.Element {
  return (
    <ErrorBoundary>
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
          <SnackBarProvider>
            <AuthProvider>
              <SocketProvider>
                <UserProvider>
                  <MessageProvider>
                    <Routes />
                  </MessageProvider>
                </UserProvider>
              </SocketProvider>
            </AuthProvider>
          </SnackBarProvider>
        </BrowserRouter>
      </MuiThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
