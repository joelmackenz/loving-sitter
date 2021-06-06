import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
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
  },
  logo: {
    flexGrow: 1,
  },
  sitterPage: {
    flexGrow: 0.05,
  },
  sitterLink: {
    color: 'white',
  },
  login: {
    flexGrow: 0.01,
  },
  loginBtn: {
    padding: '7px 30px',
    color: 'white',
  },
  otherLoginBtn: {
    color: 'black',
    padding: '7px 30px',
  },
  signUpBtn: {
    padding: '7px 30px',
    background: '#f50057',
  },
  removeLink: {
    textDecoration: 'none',
  },
}));
export default useStyles;
