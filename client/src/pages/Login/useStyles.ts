import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    minHeight: '60vh',
    marginTop: '6rem',
    marginBottom: '3rem',
  },
  authWrapper: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    flexDirection: 'column',
    minHeight: '100vh',
    paddingTop: 23,
  },
  welcome: {
    fontSize: 26,
    paddingBottom: 20,
    color: '#000000',
    margin: '1rem 0',
    fontWeight: 700,
    fontFamily: "'Open Sans'",
  },
}));

export default useStyles;
