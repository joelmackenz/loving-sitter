import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { FormikHelpers } from 'formik';
import Typography from '@material-ui/core/Typography';
import { Redirect } from 'react-router-dom';

import useStyles from './useStyles';
import register from '../../helpers/APICalls/register';
import SignUpForm from './SignUpForm/SignUpForm';
import { useAuth } from '../../context/useAuthContext';
import { useSnackBar } from '../../context/useSnackbarContext';
import LandingNavbar from '../../components/LandingNavbar/LandingNavbar';

export default function Register(): JSX.Element {
  const classes = useStyles();
  const { updateLoginContext, loggedInUser } = useAuth();
  const { updateSnackBarMessage } = useSnackBar();

  const handleSubmit = (
    { username, email, password }: { email: string; password: string; username: string },
    { setSubmitting }: FormikHelpers<{ email: string; password: string; username: string }>,
  ) => {
    register(username, email, password).then((data) => {
      if (data.error) {
        console.error({ error: data.error.message });
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

  if (loggedInUser?.email) {
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
                  SignUp
                </Typography>
              </Grid>
            </Grid>
            <SignUpForm handleSubmit={handleSubmit} />
          </Box>
          <Box p={1} alignSelf="center" />
        </Grid>
      </Grid>
    </>
  );
}
