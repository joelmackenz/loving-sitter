import { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import Popover from '@material-ui/core/Popover';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import useStyles from './useStyles';
import Alert from './alert';
import DaySelect from './DaySelectForm';

interface DateSelectProps {
  open: true | false;
  handleOpen: () => void;
  handleUpdate: (dateArray: string[]) => void;
}

const DateSelectPopover: React.FC<DateSelectProps> = ({ open, handleOpen, handleUpdate }) => {
  const classes = useStyles();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [dayArray, setDayArray] = useState<string[]>([]);

  const updateDayArray = (updatedDayArray: string[]) => {
    setDayArray(updatedDayArray);
  };

  const handleSnackbarClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <Popover
      open={open}
      className={classes.popover}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
    >
      <Card className={classes.datePickerCard}>
        <CardHeader
          className={classes.datePickerHeader}
          action={
            <IconButton aria-label="settings">
              <CloseIcon onClick={handleOpen} />
            </IconButton>
          }
        />
        <Typography variant="h5" className={classes.datePickerTitle}>
          Select available days
        </Typography>
        <DaySelect handleUpdate={updateDayArray} />
        <CardActions>
          <Grid container className={classes.datePickerActions}>
            <Button
              className={classes.datePickerButton}
              onClick={() => {
                handleOpen();
                handleUpdate(dayArray);
              }}
            >
              <Typography variant="h5">Go!</Typography>
            </Button>
            <Button
              className={classes.datePickerButton}
              onClick={() => {
                handleOpen();
              }}
            >
              <Typography variant="h6">Any day</Typography>
            </Button>
          </Grid>
        </CardActions>
      </Card>
      <Snackbar open={snackbarOpen} autoHideDuration={2000} onClose={handleSnackbarClose}>
        <Alert severity="error">Please select a date later than the start date</Alert>
      </Snackbar>
    </Popover>
  );
};

export default DateSelectPopover;
