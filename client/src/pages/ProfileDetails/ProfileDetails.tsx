import { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

import useStyles from './useStyles';
import ProfileDetailCard from '../../components/ProfileDetail/ProfileDetailCard';
import RequestCard from '../../components/ProfileDetail/RequestCard';

export default function ProfileDetails(): JSX.Element {
  const classes = useStyles();

  //testing data
  const [profile, setProfile] = useState({
    coverImg: '',
    profileImg: '',
    firstName: 'Norma',
    lastName: 'Byers',
    address: 'Toronto, Ontario',
    description: 'This is testing decription',
    galleryImg: null,
    priceRate: 14,
  });

  return (
    <Grid container className={classes.profileDetailContainer}>
      <Grid item sm={7} xs={11}>
        <Paper elevation={3}>
          <ProfileDetailCard profile={profile} />
        </Paper>
      </Grid>
      <Grid item sm={3} xs={10}>
        <Paper elevation={3} className={classes.requestGrid}>
          <RequestCard profile={profile} />
        </Paper>
      </Grid>
    </Grid>
  );
}
