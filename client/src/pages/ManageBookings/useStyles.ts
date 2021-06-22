import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    marginTop: '5rem',
  },
  bookingCard: {
    marginBottom: '1rem',
  },
  booking: {
    boxShadow: 'none',
  },
  cardHeader: {
    padding: '1rem',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bookingHeader: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  bookingTitle: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  bookingAvatar: {
    marginRight: '1rem',
    marginTop: '1rem',
    marginBottom: '1rem',
  },
  bookingProfileGrid: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bookingUserInfoGrid: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  bookingAcceptedDeclined: {
    textTransform: 'uppercase',
    color: 'grey',
    alignSelf: 'center',
    marginRight: '2rem',
  },
  settingsIcon: {
    color: 'lightgrey',
  },
  bookingList: {
    display: 'block',
  },
  bookingListCurrentPast: {
    height: '50vh',
    overflowY: 'scroll',
    overflowX: 'hidden',
  },
  currentPastBooking: {
    border: '1px solid lightgrey',
  },
});

export default useStyles;
