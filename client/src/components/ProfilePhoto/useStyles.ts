import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  cardHeader: {
    textAlign: 'center',
    '& .MuiTypography-h5': {
      fontWeight: 600,
      fontSize: '1.7rem',
    },
  },
  cardContent: {
    margin: '0 auto',
  },
  large: {
    width: theme.spacing(15),
    height: theme.spacing(15),
  },
  mediaContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  media: {
    width: '25%',
    borderRadius: '6rem',
  },
}));

export default useStyles;
