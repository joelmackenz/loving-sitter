import { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Snackbar from '@material-ui/core/Snackbar';
import SearchIcon from '@material-ui/icons/Search';
import DateRangeIcon from '@material-ui/icons/DateRange';
import CloseIcon from '@material-ui/icons/Close';

import DateSelectPopover from './DateSelectPopover';
import ProfileCard from './ProfileCard';
import Alert from './alert';

import useStyles from './useStyles';
import * as Moment from 'moment';
import { extendMoment } from 'moment-range';

// Temporary user data to show functionality
import { User, users } from './dummyUserData';

export default function ProfileListings(): JSX.Element {
  const classes = useStyles();

  const [calendarOpen, setCalendarOpen] = useState<true | false>(false);
  const [dateRange, setDateRange] = useState<Record<string, Date | null>>({ from: null, to: null });
  const [formattedDateRange, setFormattedDateRange] = useState<string>('any');
  const [displayedUsers, setDisplayedUsers] = useState<User[]>(users.slice(0, 6));
  const [snackbarOpen, setSnackbarOpen] = useState<true | false>(false);
  const [search, setSearch] = useState<string>('');

  const moment = extendMoment(Moment);

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

  const updateDateRange = (dateFrom: Date | null, dateTo: Date | null) => {
    if (dateFrom instanceof Date && dateTo instanceof Date) {
      setDateRange({
        from: dateFrom,
        to: dateTo,
      });
      const formattedDateFrom = moment(dateFrom).format('MMMM Do YYYY');
      const formattedDateTo = moment(dateTo).format('MMMM Do YYYY');
      setFormattedDateRange(`${formattedDateFrom} – ${formattedDateTo}`);
    } else {
      setFormattedDateRange(`any`);
    }
  };

  const profileCardGrid = (
    <Grid container className={classes.profilesContainer} xs={9}>
      {displayedUsers.map((user) => (
        <ProfileCard user={user} key={user._id} />
      ))}
      <Snackbar open={snackbarOpen} autoHideDuration={2000} onClose={handleSnackbarClose}>
        <Alert severity="info">No more users found</Alert>
      </Snackbar>
    </Grid>
  );

  return (
    <Grid container className={classes.root}>
      <Typography variant="h4" component="h1" className={classes.title}>
        Your search results
      </Typography>
      <Grid>
        <Grid container className={classes.searchDateContainer}>
          <Grid className={classes.search}>
            <SearchIcon className={classes.searchIcon} />
            <InputBase
              placeholder="Search by city…"
              inputProps={{ 'aria-label': 'search' }}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
          </Grid>
          <Grid>
            <Divider orientation="vertical" />
          </Grid>
          <Grid className={classes.dateRangeContainer}>
            <Button onClick={handleCalendarOpen}>
              <DateRangeIcon className={classes.dateRangeIcon} />
            </Button>
            <Typography>{formattedDateRange.charAt(0).toUpperCase() + formattedDateRange.slice(1)}</Typography>
            <Button onClick={() => setFormattedDateRange('any')}>
              <CloseIcon className={classes.dateRangeIcon} />
            </Button>
          </Grid>
        </Grid>
      </Grid>
      {profileCardGrid}
      {search === '' && formattedDateRange === 'any' ? (
        <Button onClick={handleShowMore} variant="outlined" className="showMore">
          Show More
        </Button>
      ) : null}
      <DateSelectPopover open={calendarOpen} handleOpen={handleCalendarOpen} handleUpdate={updateDateRange} />
    </Grid>
  );
}
