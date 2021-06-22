import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    minHeight: '60vh',
    marginTop: '6rem',
    marginBottom: '3rem',
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
