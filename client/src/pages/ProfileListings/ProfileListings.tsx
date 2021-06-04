import { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles, fade } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Rating from '@material-ui/lab/Rating';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import Popover from '@material-ui/core/Popover';
import SearchIcon from '@material-ui/icons/Search';
import DateRangeIcon from '@material-ui/icons/DateRange';
import CloseIcon from '@material-ui/icons/Close';
import RoomIcon from '@material-ui/icons/Room';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

// Temporary user data to show functionality
import { User, users } from './dummyUserData';

interface MediaCardProps {
  user: User;
}

const useStyles = makeStyles({
  root: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    margin: '2rem',
  },
  card: {
    margin: '2rem',
    width: '300px',
  },
  cardContentUpper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '250px',
  },
  cardContentLower: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  cardAvatar: {
    height: '100px',
    width: '100px',
  },
  profilesContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchDateContainer: {
    flexDirection: 'row',
    border: '1.25px solid lightgrey',
    borderRadius: '5px',
    justifyContent: 'center',
    padding: '.5rem',
  },
  search: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchIcon: {
    padding: '.25rem',
    color: 'red',
  },
  roomIcon: {
    color: 'red',
    paddingRight: '.25rem',
  },
  cityContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  popover: {
    backgroundColor: 'rgba(0, 0, 0, .5)',
  },
  datePickerContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '3rem',
  },
  selectDateButton: {
    marginTop: '1rem',
  },
  datePicker: {},
  dateRangeContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateRangeIcon: {
    paddingLeft: '1rem',
    paddingRight: '1rem',
    color: 'lightgrey',
  },
});

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const MediaCard: React.FC<MediaCardProps> = ({ user }) => {
  const classes = useStyles();

  const handleClickCard = () => {
    // handle navigating to profile page here
  };

  return (
    <Card className={classes.card} onClick={handleClickCard} raised={true}>
      <CardActionArea>
        <CardContent className={classes.cardContentUpper}>
          <Avatar className={classes.cardAvatar} src={user.image} />
          <Typography gutterBottom variant="h5" component="h2" style={{ fontWeight: 'bold', marginTop: '.5rem' }}>
            {user.firstName} {user.lastName}
          </Typography>
          <Typography style={{ color: 'grey' }}>{user.title}</Typography>
          <Rating style={{ margin: '.5rem' }} name="read-only" value={user.rating} readOnly />
          <Typography variant="body2" color="textSecondary" style={{ fontWeight: 'bold' }}>
            {user.description}
          </Typography>
        </CardContent>
        <Grid>
          <Divider orientation="horizontal" />
        </Grid>
        <CardContent className={classes.cardContentLower}>
          <Grid className={classes.cityContainer}>
            <RoomIcon className={classes.roomIcon} />
            <Typography style={{ color: 'grey' }}>
              {user.city}, {user.provinceState}
            </Typography>
          </Grid>
          <Typography style={{ fontWeight: 'bold' }}>${user.rate}/hr</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

interface DateSelectProps {
  open: true | false;
  handleOpen: any;
  handleUpdate: any;
}

const DateSelectPopover: React.FC<DateSelectProps> = ({ open, handleOpen, handleUpdate }) => {
  const classes = useStyles();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [dateFrom, setDateFrom] = useState<Date | null>(new Date('2021-06-01'));
  const [dateTo, setDateTo] = useState<Date | null>(new Date('2021-06-30'));

  const handleDateFromChange = (date: Date | null) => {
    setDateFrom(date);
  };

  const handleDateToChange = (date: Date | null) => {
    if (date && dateFrom && date < dateFrom) {
      setSnackbarOpen(true);
    } else {
      setDateTo(date);
    }
  };

  const updateDateRange = () => {
    handleUpdate(dateFrom, dateTo);
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
      <Grid container className={classes.datePickerContainer}>
        <Typography variant="h5">Select date range</Typography>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            className={classes.datePicker}
            disableToolbar
            format="MM/dd/yyyy"
            margin="normal"
            id="date-picker-dialog"
            label="From"
            value={dateFrom}
            onChange={handleDateFromChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
          <KeyboardDatePicker
            className={classes.datePicker}
            disableToolbar
            format="MM/dd/yyyy"
            margin="normal"
            id="date-picker-dialog"
            label="to"
            value={dateTo}
            onChange={handleDateToChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </MuiPickersUtilsProvider>
        <Button
          className={classes.selectDateButton}
          onClick={() => {
            handleOpen();
            updateDateRange();
          }}
        >
          <Typography variant="h5">Go!</Typography>
        </Button>
      </Grid>
      <Snackbar open={snackbarOpen} autoHideDuration={2000} onClose={handleSnackbarClose}>
        <Alert severity="error">Please select a date later than the start date</Alert>
      </Snackbar>
    </Popover>
  );
};

export default function ProfileListings(): JSX.Element {
  const classes = useStyles();

  const [calendarOpen, setCalendarOpen] = useState<true | false>(false);
  const [dateRange, setDateRange] = useState<string | null>(null);
  const [displayedUsers, setDisplayedUsers] = useState<User[]>(users.slice(0, 6));
  const [snackbarOpen, setSnackbarOpen] = useState<true | false>(false);

  const handleShowMore = () => {
    const numberOfUsers = displayedUsers.length;
    const lastUser = users[displayedUsers.length];
    if (lastUser === undefined) {
      setSnackbarOpen(true);
    }
    setDisplayedUsers(users.slice(0, numberOfUsers + 3));
  };

  const handleSnackbarClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleCalendarOpen = () => {
    setCalendarOpen((prevState) => !prevState);
  };

  const updateDateRange = (dateFrom: Date, dateTo: Date) => {
    const formattedDateFrom = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: '2-digit' }).format(
      dateFrom,
    );
    const formattedDateTo = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: '2-digit' }).format(
      dateTo,
    );
    setDateRange(`${formattedDateFrom} – ${formattedDateTo}`);
  };

  useEffect(() => {
    if (!dateRange) {
      setCalendarOpen(true);
    }
  }, [dateRange]);

  const mediaCardGrid = (
    <Grid container className={classes.profilesContainer} xs={9}>
      {displayedUsers.map((user) => (
        <MediaCard user={user} key={user.firstName} />
      ))}
      <Snackbar open={snackbarOpen} autoHideDuration={2000} onClose={handleSnackbarClose}>
        <Alert severity="info">No more users found</Alert>
      </Snackbar>
    </Grid>
  );

  return (
    <Grid container className={classes.root}>
      <Typography variant="h4" className={classes.title}>
        Your search results
      </Typography>
      <Grid>
        <Grid container className={classes.searchDateContainer}>
          <Grid className={classes.search}>
            <SearchIcon className={classes.searchIcon} />
            <InputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
          </Grid>
          <Grid>
            <Divider orientation="vertical" />
          </Grid>
          <Grid className={classes.dateRangeContainer}>
            <Button onClick={handleCalendarOpen}>
              <DateRangeIcon className={classes.dateRangeIcon} />
            </Button>
            <Typography>{dateRange}</Typography>
            <Button onClick={() => setDateRange(null)}>
              <CloseIcon className={classes.dateRangeIcon} />
            </Button>
          </Grid>
        </Grid>
      </Grid>
      {mediaCardGrid}
      <Button onClick={handleShowMore} variant="outlined" style={{ margin: '1rem', marginBottom: '2rem' }}>
        Show More
      </Button>
      <DateSelectPopover open={calendarOpen} handleOpen={handleCalendarOpen} handleUpdate={updateDateRange} />
    </Grid>
  );
}
