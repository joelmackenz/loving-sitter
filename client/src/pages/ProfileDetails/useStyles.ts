import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  profileDetailContainer: {
    marginTop: '8rem',
    marginBottom: '3rem',
    justifyContent: 'space-around',
  },
  requestGrid: {
    padding: '1rem',
    [theme.breakpoints.down('xs')]: {
      marginTop: '2rem',
    },
  },
}));
export default useStyles;
