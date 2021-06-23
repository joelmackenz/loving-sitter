import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import SettingsIcon from '@material-ui/icons/Settings';

import useStyles from './useStyles';

interface BookingProps {
  outlined?: boolean;
  accepted?: boolean;
  large?: boolean;
}

const Booking: React.FC<BookingProps> = ({ outlined, accepted, large }) => {
  const classes = useStyles();

  return (
    <Card variant={outlined ? 'outlined' : undefined} className={classes.booking}>
      <CardContent>
        <Grid className={classes.bookingHeader}>
          <Typography variant={large ? 'h4' : 'h5'}>16 June 2021, 10-12 AM</Typography>
          <SettingsIcon className={classes.settingsIcon} />
        </Grid>
        <Grid className={classes.bookingProfileGrid}>
          <Grid className={classes.bookingUserInfoGrid}>
            <Avatar className={classes.bookingAvatar} />
            <Typography variant={large ? 'h5' : 'h6'} component="h2">
              First Last Name
            </Typography>
          </Grid>
          <Typography className={classes.bookingAcceptedDeclined}>
            {accepted === undefined ? null : accepted ? 'accepted' : 'declined'}
          </Typography>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Booking;
