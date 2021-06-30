import { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Snackbar from '@material-ui/core/Snackbar';
import SearchIcon from '@material-ui/icons/Search';
import DateRangeIcon from '@material-ui/icons/DateRange';
import CloseIcon from '@material-ui/icons/Close';
import { RouteComponentProps } from 'react-router-dom';

import { useSnackBar } from '../../context/useSnackbarContext';
import DateSelectPopover from './DaySelectPopover';
import ProfileCard from './ProfileCard';
import Alert from './alert';
import useStyles from './useStyles';
import getProfiles from '../../helpers/APICalls/getProfiles';
import searchProfilesByCity from '../../helpers/APICalls/searchProfilesByCity';
import searchProfilesByDay from '../../helpers/APICalls/searchProfilesByDay';
import Spinner from '../../components/Spinner/Spinner';
import { IProfile } from '../../interface/Profile';
import { CustomizedRouterState } from '../Login/Login';

export interface Profile {
  firstName: string;
  lastName: string;
  isDogSitter: boolean;
  email: string;
  _id: string;
  profileId: IProfile[];
}

export default function ProfileListings({ location }: RouteComponentProps): JSX.Element {
  const classes = useStyles();
  const state = location.state as CustomizedRouterState;

  const { updateSnackBarMessage } = useSnackBar();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [calendarOpen, setCalendarOpen] = useState<true | false>(false);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [daySearchDisplay, setDaySearchDisplay] = useState<string>('any');
  const [displayedProfiles, setDisplayedProfiles] = useState<Profile[]>(profiles.slice(0, 6));
  const [snackbarOpen, setSnackbarOpen] = useState<true | false>(false);
  const [search, setSearch] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleShowMore = () => {
    const numberOfUsers = displayedProfiles.length;
    const lastUser = profiles[displayedProfiles.length];
    if (lastUser === undefined) {
      setSnackbarOpen(true);
    }
    setDisplayedProfiles(profiles.slice(0, numberOfUsers + 3));
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

  const initializeProfiles = () => {
    getProfiles().then((data) => {
      const users = data.allUsers;
      if (users?.length) {
        setDisplayedProfiles(users.slice(0, 6));
        setProfiles(users);
      } else if (data.error) {
        setErrorMessage(data.error);
      } else {
        updateSnackBarMessage('No Dog Sitter Found!');
      }
    });
  };

  const updateDayArray = (dayArray: string[]) => {
    setSelectedDays(dayArray);
    const formattedDayArray: string[] = [];
    dayArray.map((day) => {
      day = day.charAt(0).toUpperCase() + day.slice(1);
      formattedDayArray.push(day);
    });
    setDaySearchDisplay(formattedDayArray.join(', '));
  };

  const updateBySearch = async () => {
    if (!search && !state?.searchCity) {
      initializeProfiles();
    } else {
      setDisplayedProfiles([]);
      const data = await searchProfilesByCity(search);
      const users = data.allUsers;
      if (users?.length) {
        setDisplayedProfiles(users);
      } else if (data.error) {
        setErrorMessage(data.error);
      }
    }
  };

  const updateByDays = async () => {
    if (!selectedDays) {
      initializeProfiles();
    } else {
      const data = await searchProfilesByDay(selectedDays);
      const users = data.allUsers;
      if (users?.length) {
        setDisplayedProfiles(users);
      } else if (data.error) {
        setDisplayedProfiles([]);
        setErrorMessage(data.error);
      }
    }
  };

  const profileCardGrid = (
    <Grid container className={classes.profilesContainer}>
      {displayedProfiles.length ? (
        displayedProfiles.map((user) => {
          return (
            <Grid item key={user._id}>
              <ProfileCard profile={user} />
            </Grid>
          );
        })
      ) : errorMessage !== '' ? (
        <p>{errorMessage}</p>
      ) : (
        <Spinner />
      )}
      <Snackbar open={snackbarOpen} autoHideDuration={2000} onClose={handleSnackbarClose}>
        <Alert severity="info">No more users found</Alert>
      </Snackbar>
    </Grid>
  );

  useEffect(() => {
    if (state?.searchCity) {
      setSearch(state.searchCity);
    } else {
      initializeProfiles();
    }
  }, []);

  useEffect(() => {
    updateByDays();
  }, [selectedDays, setSelectedDays]);

  useEffect(() => {
    updateBySearch();
  }, [search, setSearch]);

  return (
    <Grid container className={classes.root}>
      <Typography variant="h4" component="h1" className={classes.title}>
        Choose Your Dog Sitter
      </Typography>
      <Grid>
        <Grid container className={classes.searchDateContainer}>
          <Grid className={classes.search}>
            <SearchIcon className={classes.searchIcon} />
            <InputBase
              placeholder="Search by city…"
              inputProps={{ 'aria-label': 'search' }}
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
          </Grid>
          <Grid>
            <Divider orientation="vertical" />
          </Grid>
          <Grid className={classes.dateRangeContainer}>
            <Button onClick={handleCalendarOpen} component="span">
              <DateRangeIcon className={classes.dateRangeIcon} />
            </Button>
            <Typography>{daySearchDisplay.charAt(0).toUpperCase() + daySearchDisplay.slice(1)}</Typography>
            <Button onClick={() => setDaySearchDisplay('any')} component="span">
              <CloseIcon className={classes.dateRangeIcon} />
            </Button>
          </Grid>
        </Grid>
      </Grid>
      {profileCardGrid}
      {!search && daySearchDisplay === 'any' && (
        <Button onClick={handleShowMore} variant="outlined" className={classes.showMore}>
          Show More
        </Button>
      )}
      <DateSelectPopover open={calendarOpen} handleOpen={handleCalendarOpen} handleUpdate={updateDayArray} />
    </Grid>
  );
}
