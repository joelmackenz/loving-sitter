import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#fafafb',
    minHeight: '100vh',
    marginBottom: '3rem',
    marginTop: '3.5rem',
    padding: '0px 16px',
    [theme.breakpoints.down('sm')]: {
      padding: '0px',
    },
  },
  leftColumn: {
    marginTop: '4rem',
    marginLeft: '1rem',
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
  },
  tab: {
    fontSize: '1.1rem',
    '& .MuiTab-wrapper': {
      alignItems: 'flex-start',
    },
  },
  indicator: {
    backgroundColor: '#fafafb',
  },
}));

export default useStyles;
