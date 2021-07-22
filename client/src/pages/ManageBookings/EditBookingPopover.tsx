import { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import TextField from '@material-ui/core/TextField';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Popover from '@material-ui/core/Popover';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import useStyles from './useStyles';

interface EditBookingProps {
  open: true | false;
  handleOpen: any;
  dateString?: string;
  name?: string;
  avatar?: string;
  anchor: any;
}

const EditBookingPopover: React.FC<EditBookingProps> = ({ open, handleOpen, dateString, name, avatar, anchor }) => {
  const classes = useStyles();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [dayArray, setDayArray] = useState<string[]>([]);
  const [updatedDate, setUpdatedDate] = useState<Date>();

  const updateDayArray = (updatedDayArray: string[]) => {
    setDayArray(updatedDayArray);
  };

  const handleSnackbarClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  const handleChange = (e: any) => {
    e.preventDefault();
    setUpdatedDate(e.target.value);
  };

  return (
    <Popover
      open={open}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      anchorEl={anchor}
    >
      <Card className={classes.popoverCard}>
        <CardHeader
          action={
            <IconButton aria-label="settings">
              <CloseIcon onClick={handleOpen} />
            </IconButton>
          }
        />
        <Grid className={classes.popoverDateContainer}>
          <form
            noValidate
            className={classes.popoverDateTime}
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <TextField
              className={classes.popoverTextField}
              InputProps={{
                classes: {
                  input: classes.popoverDateText,
                },
              }}
              id="date"
              type="date"
              defaultValue={dateString}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleChange}
            />
            <Typography>at</Typography>
            <TextField
              className={classes.popoverTextField}
              InputProps={{
                classes: {
                  input: classes.popoverDateText,
                },
              }}
              id="time"
              type="time"
              defaultValue="12:00"
              InputLabelProps={{
                shrink: false,
              }}
              inputProps={{
                step: 300, // 5 min
              }}
            />
            <Button type="submit" value="Submit">
              Update
            </Button>
          </form>
        </Grid>
        <CardContent>
          <Grid className={classes.bookingProfileGrid}>
            <Grid className={classes.bookingUserInfoGrid}>
              <Avatar className={classes.bookingAvatar} src={avatar} alt="" />
              <Typography component="h2" variant="h5" className={classes.name}>
                {name}
              </Typography>
            </Grid>
            <Grid className={classes.popoverAcceptContainer}>
              <Button color="default">Accept</Button>
              <Button color="secondary">Deny</Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Popover>
  );
};

export default EditBookingPopover;
