import { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { RouteComponentProps } from 'react-router-dom';

import useStyles from './useStyles';
import Spinner from '../../components/Spinner/Spinner';
import { useSnackBar } from '../../context/useSnackbarContext';
import ProfileDetailCard from '../../components/ProfileDetail/ProfileDetailCard';
import RequestCard from '../../components/ProfileDetail/RequestCard';
import { Profile } from '../ProfileListings/ProfileListings';
import { getOneFullUserProfile } from '../../helpers/APICalls/getProfiles';

interface StateProps {
  previousPath?: string;
  profile?: Profile;
}

export default function ProfileDetails({ location, match }: RouteComponentProps): JSX.Element {
  const classes = useStyles();
  const { updateSnackBarMessage } = useSnackBar();
  const state = location.state as StateProps;
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    if (state && state.profile) {
      setProfile(state.profile);
    } else {
      const params = match.params as { userId: string };
      getOneFullUserProfile(params.userId).then((data) => {
        if (data.error) {
          updateSnackBarMessage(data.error);
        } else if (data.success) {
          if (data.user) {
            setProfile(data.user);
          }
        }
      });
    }
  }, [match]);

  return (
    <Grid container className={classes.profileDetailContainer}>
      <Grid item sm={7} xs={11}>
        <Paper elevation={3}>{profile ? <ProfileDetailCard profile={profile} /> : <Spinner />}</Paper>
      </Grid>
      <Grid item sm={3} xs={10}>
        <Paper elevation={3} className={classes.requestGrid}>
          {profile ? <RequestCard profile={profile} /> : <Spinner />}
        </Paper>
      </Grid>
    </Grid>
  );
}
