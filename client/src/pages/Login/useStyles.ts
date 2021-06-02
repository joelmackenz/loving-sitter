import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    minHeight: '100vh',
    width: '100%',
    '& .MuiInput-underline:before': {
      borderBottom: '1.2px solid rgba(0, 0, 0, 0.2)',
    },
  },
  authWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    paddingTop: 23,
  },
  welcome: {
    fontSize: '40px',
    paddingBottom: 20,
    color: '#000000',
    fontWeight: 700,
    fontFamily: "'Open Sans'",
    textAlign: 'center',
  },
  signUpInfo: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  signUpLink: {
    color: 'red',
  },
}));

export default useStyles;
