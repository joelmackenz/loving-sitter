import { makeStyles } from '@material-ui/core/styles';

// eslint-disable-next-line
const useStyles = (props: { isLessthanSm: boolean }) =>
  makeStyles((theme) => ({
    root: {
      backgroundColor: '#fafafb',
      minHeight: '100vh',
      marginBottom: '3rem',
    },
    leftColumn: {
      marginTop: '4rem',
      marginLeft: props.isLessthanSm ? '1rem' : '5rem',
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
  }));

export default useStyles;
