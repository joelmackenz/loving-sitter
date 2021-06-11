import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: '0 2rem',
    '@media (max-width: 900px)': {
      paddingLeft: 0,
      paddingRight: 0,
    },
    '@media (max-width: 600px)': {
      position: 'relative',
    },
  },
  menuItem: {
    '&.MuiListItem-button:hover': {
      backgroundColor: 'initial',
    },
  },
  mainPageNavbar: {
    top: 0,
    backgroundColor: 'transparent',
    position: 'fixed',
    boxShadow: 'none',
  },
  otherPageNavbar: {
    backgroundColor: 'white',
  },
  otherSitterLink: {
    color: 'black',
    textTransform: 'uppercase',
  },
  logo: {
    textAlign: 'left',
  },
  sitterPage: {
    flexGrow: 0.05,
  },
  sitterLink: {
    color: 'black',
    textTransform: 'uppercase',
  },
  login: {
    flexGrow: 0.01,
  },
  loginBtn: {
    padding: theme.spacing(1.5, 3),
    color: 'black',
    textTransform: 'uppercase',
  },
  otherLoginBtn: {
    color: 'black',
    padding: theme.spacing(1.5, 3),
    textTransform: 'uppercase',
  },
  signUpBtn: {
    padding: theme.spacing(1.5, 3),
    textTransform: 'uppercase',
  },
}));
export default useStyles;
