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
}));

export default useStyles;
