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
  subBox: {
    padding: '30px 120px',
    '@media (max-width: 600px)': {
      padding: theme.spacing(6, 6, 0, 6),
    },
  },
  mainText: {
    fontWeight: 900,
    whiteSpace: 'nowrap',
    '@media (max-width: 600px)': {
      marginTop: '2rem',
      fontSize: '1.5rem',
      textAlign: 'center',
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
    '@media (max-width: 600px)': {
      '&.MuiFormControl-fullWidth': {
        width: '100%',
      },
    },
  },
  dateRange: {
    width: '35%',
    '@media (max-width: 600px)': {
      width: '100%',
    },
  },
  mainPageBtn: {
    padding: theme.spacing(2, 6),
    marginTop: '35px',
    textTransform: 'uppercase',
  },
  mainPhoto: {
    width: '100%',
    height: '100vh',
    '@media (max-width: 600px)': {
      display: 'none',
    },
  },
}));
export default useStyles;
