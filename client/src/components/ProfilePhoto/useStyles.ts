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
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  mediaContainer: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    '& .MuiTypography-root': {
      marginTop: '1rem',
    },
  },
  backgroundMedia: {
    maxHeight: '300px',
  },
  media: {
    position: 'absolute',
    width: '25%',
    bottom: '-23%',
    border: '4px solid white',
    borderRadius: '6rem',
  },
  profileMediaInfo: {
    textAlign: 'center',
    marginTop: '5rem',
  },
  upload: {
    margin: theme.spacing(2, 2, 2),
    padding: 10,
    width: 240,
    height: 56,
    borderRadius: theme.shape.borderRadius,
    fontWeight: 'bold',
    fontSize: '0.8rem',
  },
}));

export default useStyles;
