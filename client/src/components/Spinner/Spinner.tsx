import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  spinnerOverlay: {
    height: '60vh',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinnerContainer: {
    display: 'inline-block',
    width: '50px',
    height: '50px',
    border: '3px solid rgba(195, 195, 195, 0.6)',
    borderRadius: '50%',
    borderTopColor: '#636767',
    animation: `$spin 1s ${theme.transitions.easing.easeInOut} infinite`,
    WebkitAnimation: `$spin 1s ${theme.transitions.easing.easeInOut} infinite`,
  },
  '@keyframes spin': {
    '100%': {
      transform: 'rotate(360deg)',
    },
  },
}));

export default function Spinner(): JSX.Element {
  const classes = useStyles();
  return (
    <div className={classes.spinnerOverlay}>
      <div className={classes.spinnerContainer}></div>
    </div>
  );
}
