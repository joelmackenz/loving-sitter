import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#fafafb',
    minHeight: '100vh',
    marginBottom: '3rem',
  },
  leftColumn: {
    marginTop: '4rem',
    marginLeft: '5rem',
    '& .MuiTypography-h6': {
      fontWeight: 600,
      cursor: 'pointer',
    },
  },
  rightColumn: {
    minHeight: '80vh',
    marginTop: '3rem',
    borderRadius: theme.shape.borderRadius,
    width: '100%',
    // padding: '1.5rem',
  },
}));

export default useStyles;
