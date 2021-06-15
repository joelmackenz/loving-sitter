import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  profileDetailContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: '50px',
  },
  profileInfo: {
    width: '50%',
  },
  requestInfo: {
    height: 'fit-content',
    padding: '10px',
  },
}));
export default useStyles;
