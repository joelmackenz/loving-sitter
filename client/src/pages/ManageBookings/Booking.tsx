import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import SettingsIcon from '@material-ui/icons/Settings';
import { IconButton, Popper } from '@material-ui/core';
import EditBookingPopover from './EditBookingPopover';
import { useState } from 'react';

import useStyles from './useStyles';

interface BookingProps {
  outlined?: boolean;
  accepted?: boolean;
  large?: boolean;
  date?: Date;
  name?: string;
  avatar?: string;
}

const Booking: React.FC<BookingProps> = ({ outlined, accepted, large, date, name, avatar }) => {
  const [popperAnchor, setPopperAnchor] = useState<null | HTMLElement>(null);

  const classes = useStyles();

  const dateString = date && date.toString().split('T')[0];

  const [popoverOpen, setPopoverOpen] = useState<boolean>(false);

  const openClosePopover = (target: HTMLButtonElement) => {
    setPopoverOpen((prevState) => !prevState);
    if (target === popperAnchor) {
      setPopperAnchor(null);
    } else {
      setPopperAnchor(target);
    }
  };

  return (
    <Card variant={outlined ? 'outlined' : undefined} className={classes.booking}>
      <CardContent>
        <Grid className={classes.bookingHeader}>
          <Typography className={classes.date} variant={large ? 'h4' : 'h5'}>
            {dateString}
          </Typography>
          <IconButton
            onClick={(e) => {
              openClosePopover(e.currentTarget);
            }}
          >
            <SettingsIcon className={classes.settingsIcon} />
          </IconButton>
        </Grid>
        <Grid className={classes.bookingProfileGrid}>
          <Grid className={classes.bookingUserInfoGrid}>
            <Avatar className={classes.bookingAvatar} src={avatar} alt="" />
            <Typography className={classes.name} variant={large ? 'h5' : 'h6'} component="h2">
              {name}
            </Typography>
          </Grid>
          <Typography className={classes.bookingAcceptedDeclined}>
            {accepted === undefined ? null : accepted ? 'accepted' : 'declined'}
          </Typography>
        </Grid>
      </CardContent>
      <EditBookingPopover
        open={popoverOpen}
        handleOpen={(e: any) => {
          openClosePopover(e.currentTarget);
        }}
        dateString={dateString}
        name={name}
        avatar={avatar}
        anchor={popperAnchor}
      />
    </Card>
  );
};

export default Booking;
