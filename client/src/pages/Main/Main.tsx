import { useState, ChangeEvent, FormEvent } from 'react';
import { Button, Grid, TextField, Typography } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import Box from '@material-ui/core/Box';
import { RouteComponentProps, Redirect } from 'react-router-dom';

import mainPagePhoto from '../../Images/mainPagePhoto.jpg';
import useStyles from './useStyles';
import LandingNavbar from '../../components/LandingNavbar/LandingNavbar';
import { useAuth } from '../../context/useAuthContext';
import { CustomizedRouterState } from '../Login/Login';
import { useSnackBar } from '../../context/useSnackbarContext';

export default function Main({ location }: RouteComponentProps): JSX.Element {
  const [searchCity, setSearchCity] = useState<string>('');
  const { updateSnackBarMessage } = useSnackBar();
  const classes = useStyles();

  const { loggedInUser } = useAuth();

  const state = location.state as CustomizedRouterState;

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => setSearchCity(event.target.value);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (searchCity === '') {
      return updateSnackBarMessage('Please enter city value first.');
    }
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
      <div className={classes.root}>
        <Grid container>
          <Grid item sm={6} xs={12} className={classes.mainContent}>
            <Grid className={classes.subBox}>
              <Typography variant="h2" component="h1" className={classes.mainText}>
                Find the care your
                <Box display="block" component="span">
                  dog deserves
                </Box>
              </Typography>
              <form onSubmit={handleSubmit}>
                <InputLabel htmlFor="search" className={classes.searchText}>
                  WHERE
                </InputLabel>
                <TextField
                  id="search"
                  name="search"
                  variant="outlined"
                  placeholder="City - Toronto"
                  className={classes.searchInput}
                  fullWidth
                  onChange={handleChange}
                />
                <Grid>
                  <Button type="submit" variant="contained" color="primary" className={classes.mainPageBtn}>
                    FIND MY DOG SITTER
                  </Button>
                </Grid>
              </form>
            </Grid>
          </Grid>
          <Grid item sm={6} xs={12}>
            <img src={mainPagePhoto} alt="mainPagePhoto" className={classes.mainPhoto} />
          </Grid>
        </Grid>
      </div>
    </>
  );
}
