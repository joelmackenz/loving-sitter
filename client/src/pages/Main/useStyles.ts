import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    backgroundColor: 'white',
  },
  mainContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainText: {
    fontWeight: 900,
    whiteSpace: 'nowrap',
    [theme.breakpoints.only('xs')]: {
      fontSize: '1.5rem',
      textAlign: 'center',
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: '10rem',
      textAlign: 'center',
    },
    [theme.breakpoints.only('md')]: {
      fontSize: '2.5rem',
    },
  },
  searchText: {
    fontWeight: 900,
    marginTop: '30px',
    marginBottom: '10px',
    textTransform: 'uppercase',
    color: 'black',
  },
  dateRangeContainer: {
    display: 'flex',
  },
  inlineDisplay: {
    display: 'inline-block',
  },
  searchInput: {
    '&.MuiFormControl-fullWidth': {
      width: '70%',
      display: 'block',
    },
    [theme.breakpoints.down('sm')]: {
      '&.MuiFormControl-fullWidth': {
        width: '100%',
      },
    },
  },
  dateRange: {
    width: '35%',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  mainPageBtn: {
    padding: theme.spacing(2, 6),
    marginTop: '35px',
    textTransform: 'uppercase',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  mainPhotoContainer: {
    minHeight: '100vh',
    minWidth: '50vw',
  },
  mainPhoto: {
    height: '100%',
    width: '100%',
    objectFit: 'cover',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
}));
export default useStyles;
