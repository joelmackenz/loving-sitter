import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    marginTop: '5.5rem',
    marginBottom: '1.3rem',
    textTransform: 'capitalize',
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
  cardUserAvatar: {
    height: '100px',
    width: '100px',
  },
  cardUserTitle: {
    color: 'grey',
  },
  cardUserRating: {
    margin: '.5rem',
  },
  cardUserName: {
    fontWeight: 'bold',
    marginTop: '.5rem',
  },
  cardUserDesc: {
    fontWeight: 'bold',
  },
  cardUserLocation: {
    color: 'grey',
  },
  cardUserRate: {
    fontWeight: 'bold',
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
  datePickerCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem',
  },
  datePickerHeader: {
    alignSelf: 'flex-end',
  },
  datePickerTitle: {
    paddingBottom: '1rem',
  },
  datePickerActions: {
    flexDirection: 'column',
  },
  datePickerButton: {
    marginTop: '1rem',
    width: '7rem',
  },
  datePicker: {
    marginRight: '5rem',
    marginLeft: '5rem',
    marginTop: '1rem',
    marginBottom: '1rem',
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
  showMore: {
    margin: '1rem',
    marginBottom: '2rem',
  },
  cardLinkContainer: {
    textDecoration: 'none',
  },
});

export default useStyles;
