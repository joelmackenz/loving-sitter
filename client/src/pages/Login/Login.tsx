import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { FormikHelpers } from 'formik';
import Typography from '@material-ui/core/Typography';
import { Redirect, RouteComponentProps } from 'react-router-dom';

import useStyles from './useStyles';
import login from '../../helpers/APICalls/login';
import LoginForm from './LoginForm/LoginForm';
import { useAuth } from '../../context/useAuthContext';
import { useSnackBar } from '../../context/useSnackbarContext';
import LandingNavbar from '../../components/LandingNavbar/LandingNavbar';

export interface CustomizedRouterState {
  previousPath?: string;
}

export default function Login({ location }: RouteComponentProps): JSX.Element {
  const classes = useStyles();
  const { updateLoginContext, loggedInUser } = useAuth();
  const { updateSnackBarMessage } = useSnackBar();

  const state = location.state as CustomizedRouterState;

  const handleSubmit = (
    { email, password }: { email: string; password: string },
    { setSubmitting }: FormikHelpers<{ email: string; password: string }>,
  ) => {
    login(email, password).then((data) => {
      if (data.error) {
        setSubmitting(false);
        updateSnackBarMessage(data.error.message);
      } else if (data.success) {
        updateLoginContext(data.success);
      } else {
        // should not get here from backend but this catch is for an unknown issue
        console.error({ data });

        setSubmitting(false);
        updateSnackBarMessage('An unexpected error occurred. Please try again');
      }
    });
  };

  if (
    state?.previousPath &&
    loggedInUser?.email &&
    state?.previousPath !== '/login' &&
    state?.previousPath !== '/signup' &&
    state?.previousPath !== '/'
  ) {
    return <Redirect to={state.previousPath} />;
  } else if (loggedInUser?.email) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <>
      <LandingNavbar />
      <Grid container component="main" className={classes.root} justify="center">
        <CssBaseline />
        <Grid item xs={12} sm={8} md={6} elevation={6} component={Paper} square>
          <Box width="100%" maxWidth={350} p={3} margin="auto">
            <Grid container>
              <Grid item xs>
                <Typography className={classes.welcome} component="h1" variant="h5" align="center">
                  Login
                </Typography>
              </Grid>
            </Grid>
            <LoginForm handleSubmit={handleSubmit} />
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
