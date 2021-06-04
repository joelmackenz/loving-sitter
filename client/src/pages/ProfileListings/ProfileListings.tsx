import { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
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
import SearchIcon from '@material-ui/icons/Search';
import DateRangeIcon from '@material-ui/icons/DateRange';
import CloseIcon from '@material-ui/icons/Close';
import RoomIcon from '@material-ui/icons/Room';
import DateSelectPopover from './DateSelectPopover';
import Alert from './alert';
import useStyles from './useStyles';
import * as Moment from 'moment';
import { extendMoment } from 'moment-range';

// Temporary user data to show functionality
import { User, users } from './dummyUserData';

interface MediaCardProps {
  user: User;
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
      const formattedDateFrom = new Intl.DateTimeFormat('en', {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
      }).format(dateFrom);
      const formattedDateTo = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: '2-digit' }).format(
        dateTo,
      );
      setFormattedDateRange(`${formattedDateFrom} – ${formattedDateTo}`);
    } else {
      setFormattedDateRange(`any`);
    }
  };

  const updateSearch = () => {
    const searchResults: User[] = [];
    setDisplayedUsers([]);
    users.map((user: User) => {
      if (user.city.toLowerCase().includes(search)) {
        searchResults.push(user);
        setDisplayedUsers(searchResults);
      }
    });
  };

  useEffect(() => {
    if (formattedDateRange === 'any') {
      setDisplayedUsers(users.slice(0, 6));
    } else {
      if (dateRange.from && dateRange.to) {
        const searchResults: User[] = [];
        setDisplayedUsers([]);
        const range = moment.range(dateRange.from, dateRange.to);
        users.map((user) => {
          const isInDateRange = (date: Date) => {
            return range.contains(date);
          };
          //   If at least one available date falls within the selected range, the user
          //   is added to the displayedUsers array.
          if (user.availableDates.some(isInDateRange)) {
            searchResults.push(user);
            setDisplayedUsers(searchResults);
          }
        });
      }
    }
  }, [dateRange, setDateRange, formattedDateRange, setFormattedDateRange]);

  useEffect(() => {
    if (search) {
      updateSearch();
    } else {
      setDisplayedUsers(users.slice(0, 6));
    }
  }, [search, setSearch]);

  const mediaCardGrid = (
    <Grid container className={classes.profilesContainer} xs={9}>
      {displayedUsers.map((user) => (
        <MediaCard user={user} key={user._id} />
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
      {mediaCardGrid}
      {search === '' && formattedDateRange === 'any' ? (
        <Button onClick={handleShowMore} variant="outlined" style={{ margin: '1rem', marginBottom: '2rem' }}>
          Show More
        </Button>
      ) : null}
      <DateSelectPopover open={calendarOpen} handleOpen={handleCalendarOpen} handleUpdate={updateDateRange} />
    </Grid>
  );
}
