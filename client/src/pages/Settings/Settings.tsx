import { useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

import EditProfile from '../../components/EditProfile/EditProfile';
import ProfilePhoto from '../../components/ProfilePhoto/ProfilePhoto';
import PaymentMethods from '../../components/PaymentMethods/PaymentMethods';
import useStyles from './useStyles';

const Settings = (): JSX.Element => {
  const theme = useTheme();
  const isLessthanSm: boolean = useMediaQuery(theme.breakpoints.down('sm'));
  const classes = useStyles({ isLessthanSm })();
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
            onClick={() => setCurrentTab('availability')}
          >
            Availability
          </Typography>
          <Typography
            paragraph
            color={currentTab === 'payment' ? 'textPrimary' : 'textSecondary'}
            variant="h6"
            component="h3"
            onClick={() => setCurrentTab('payment')}
          >
            Payment
          </Typography>
          <Typography
            paragraph
            color={currentTab === 'settings' ? 'textPrimary' : 'textSecondary'}
            variant="h6"
            component="h3"
            onClick={() => setCurrentTab('settings')}
          >
            Settings
          </Typography>
        </Grid>
        <Grid item xs={12} sm={8} md={7} component="section">
          <Card elevation={6} square className={classes.rightColumn}>
            {currentTab === 'profilePhoto' ? (
              <ProfilePhoto />
            ) : currentTab === 'payment' ? (
              <PaymentMethods />
            ) : (
              <EditProfile />
            )}
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Settings;
