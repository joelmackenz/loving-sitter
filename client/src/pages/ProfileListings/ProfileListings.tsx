import { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles, fade } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
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

interface User {
  _id: number;
  image: string;
  firstName: string;
  lastName: string;
  title: string;
  rating: number;
  description: string;
  city: string;
  provinceState: string;
  rate: number;
}

interface MediaCardProps {
  user: User;
}

// Dummy data
import image1 from '../../Images/68f55f7799df6c8078a874cfe0a61a5e6e9e1687.png';
const user1: User = {
  _id: 1,
  image: image1,
  firstName: 'Lorem',
  lastName: 'Ipsum',
  title: 'Pet sitter',
  rating: 5,
  description: 'I provide dog walking and pet sitting services',
  city: 'Toronto',
  provinceState: 'Ontario',
  rate: 15,
};
import image2 from '../../Images/775db5e79c5294846949f1f55059b53317f51e30.png';
const user2: User = {
  _id: 2,
  image: image2,
  firstName: 'Sed',
  lastName: 'Elementum',
  title: 'Professional dog trainer',
  rating: 3,
  description: 'Dog sitting, cat sitting, pocket pet and bird care',
  city: 'Lethbridge',
  provinceState: 'Alberta',
  rate: 16,
};
import image3 from '../../Images/b1f0e680702e811aa8ba333cb19c0e0ea95e8e31.png';
const user3: User = {
  _id: 3,
  image: image3,
  firstName: 'Nunc',
  lastName: 'Aliquet',
  title: 'Dog care helper',
  rating: 5,
  description: 'I would love to work with your dog',
  city: "St. John's",
  provinceState: 'Newfoundland',
  rate: 20,
};
import image4 from '../../Images/d9fc84a0d1d545d77e78aaad39c20c11d3355074.png';
const user4: User = {
  _id: 4,
  image: image4,
  firstName: 'Lacinia',
  lastName: 'Quis',
  title: 'Animal lover',
  rating: 4,
  description: 'I have had dogs as pets for most of my life',
  city: 'Pitt Meadows',
  provinceState: 'BC',
  rate: 22,
};
const user5: User = {
  _id: 5,
  image: image1,
  firstName: 'Interdum',
  lastName: 'Pharetra',
  title: 'Cat owner',
  rating: 3,
  description: "I have four cats, and I think that's a normal thing",
  city: 'Seattle',
  provinceState: 'Washington',
  rate: 25,
};
const user6: User = {
  _id: 6,
  image: image2,
  firstName: 'Lacinia',
  lastName: 'Quis',
  title: 'Professional dog walker',
  rating: 5,
  description: 'I have been doing this job for many years',
  city: 'Maryland',
  provinceState: 'Georgia',
  rate: 24,
};
const user7: User = {
  _id: 7,
  image: image3,
  firstName: 'Diam',
  lastName: 'Euismod',
  title: 'Pitt bull lover',
  rating: 4,
  description: "I'd love to walk your pitt bull",
  city: 'Quebec City',
  provinceState: 'Quebec',
  rate: 18,
};
const user8: User = {
  _id: 8,
  image: image4,
  firstName: 'Sem',
  lastName: 'Imperdiet',
  title: 'Giunea pig friend',
  rating: 2,
  description: "If you've got a guinea pig, I want to meet it!",
  city: 'Ottawa',
  provinceState: 'Ontario',
  rate: 20,
};
const user9: User = {
  _id: 9,
  image: image2,
  firstName: 'Elit',
  lastName: 'Malesuada',
  title: 'Cat sitter',
  rating: 3.5,
  description: 'Let me watch your cats!',
  city: 'Coffeeville',
  provinceState: 'Alberta',
  rate: 14,
};
const user10: User = {
  _id: 10,
  image: image1,
  firstName: 'Sed',
  lastName: 'Ullamcorper',
  title: 'Senior dog friend',
  rating: 5,
  description: 'I love senior dogs',
  city: 'Vancouver',
  provinceState: 'BC',
  rate: 26,
};

const users: User[] = [user1, user2, user3, user4, user5, user6, user7, user8, user9, user10];

const useStyles = makeStyles({
  root: {
    // flexGrow: 1,
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
  datePicker: {
    // height: '1rem',
  },
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

export default function ProfileListings(): JSX.Element {
  const classes = useStyles();

  const [displayedUsers, setDisplayedUsers] = useState<User[]>(users.slice(0, 6));
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [dateFrom, setDateFrom] = useState<Date | null>(new Date('2014-08-18T21:11:54'));
  const [dateTo, setDateTo] = useState<Date | null>(new Date('2014-08-18T21:11:54'));
  const [chosenDateRange, setChosenDateRange] = useState<string | null>('16 - 17 June 2019');

  const handleDateFromChange = (date: Date | null) => {
    setDateFrom(date);
  };

  const handleDateToChange = (date: Date | null) => {
    setDateTo(date);
  };

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

  //   const dateSelectPopover = (
  //     <Popover>
  //       <MuiPickersUtilsProvider utils={DateFnsUtils}>
  //         <KeyboardDatePicker
  //           className={classes.datePicker}
  //           disableToolbar
  //           variant="inline"
  //           format="MM/dd/yyyy"
  //           margin="normal"
  //           id="date-picker-inline"
  //           label="From"
  //           value={dateFrom}
  //           onChange={handleDateFromChange}
  //           KeyboardButtonProps={{
  //             'aria-label': 'change date',
  //           }}
  //         />
  //         <KeyboardDatePicker
  //           className={classes.datePicker}
  //           disableToolbar
  //           variant="inline"
  //           format="MM/dd/yyyy"
  //           margin="normal"
  //           id="date-picker-inline"
  //           label="To"
  //           value={dateTo}
  //           onChange={handleDateToChange}
  //           KeyboardButtonProps={{
  //             'aria-label': 'change date',
  //           }}
  //         />
  //       </MuiPickersUtilsProvider>
  //       <Button>Go!</Button>
  //     </Popover>
  //   );

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
            <DateRangeIcon className={classes.dateRangeIcon} />
            <Typography>{chosenDateRange}</Typography>
            <CloseIcon className={classes.dateRangeIcon} />
          </Grid>
        </Grid>
      </Grid>
      {mediaCardGrid}
      <Button onClick={handleShowMore} variant="outlined" style={{ margin: '1rem', marginBottom: '2rem' }}>
        Show More
      </Button>
    </Grid>
  );
}
