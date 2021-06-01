import { useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';

import EditProfile from '../../components/EditProfile/EditProfile';
import ProfilePhoto from '../../components/ProfilePhoto/ProfilePhoto';
import useStyles from './useStyles';

const Settings = (): JSX.Element => {
  const classes = useStyles();
  const [currentTab, setCurrentTab] = useState('');
  return (
    <Container className={classes.root}>
      <Grid container component="main" justify="space-evenly">
        <CssBaseline />
        <Grid item xs={12} sm={8} md={2} component="section" className={classes.leftColumn}>
          <Typography
            paragraph
            color={currentTab === '' ? 'textPrimary' : 'textSecondary'}
            variant="h6"
            component="h3"
            onClick={() => setCurrentTab('')}
          >
            Edit Profile
          </Typography>
          <Typography
            paragraph
            color={currentTab === 'profilePhoto' ? 'textPrimary' : 'textSecondary'}
            variant="h6"
            component="h3"
            onClick={() => setCurrentTab('profilePhoto')}
          >
            Profile Photo
          </Typography>
          <Typography
            paragraph
            color={currentTab === 'availability' ? 'textPrimary' : 'textSecondary'}
            variant="h6"
            component="h3"
          >
            Availability
          </Typography>
          <Typography
            paragraph
            color={currentTab === 'payment' ? 'textPrimary' : 'textSecondary'}
            variant="h6"
            component="h3"
          >
            Payment
          </Typography>
          <Typography
            paragraph
            color={currentTab === 'settings' ? 'textPrimary' : 'textSecondary'}
            variant="h6"
            component="h3"
          >
            Settings
          </Typography>
        </Grid>
        <Grid item xs={12} sm={8} md={7} component="section">
          <Card elevation={6} square className={classes.rightColumn}>
            {currentTab === 'profilePhoto' ? <ProfilePhoto /> : <EditProfile />}
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Settings;
