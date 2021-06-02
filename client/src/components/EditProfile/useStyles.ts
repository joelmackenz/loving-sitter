import { makeStyles } from '@material-ui/core/styles';

const useStyles = (props: { isLessthanSm: boolean }) =>
  makeStyles((theme) => ({
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
    inputLabelGridContainer: {
      textAlign: props.isLessthanSm ? 'left' : 'right',
      alignSelf: 'center',
      marginRight: '0.8rem',
      '& .MuiFormLabel-root': {
        color: 'black',
        fontWeight: 600,
        textTransform: 'uppercase',
        fontSize: '0.8rem',
      },
    },
    inputLabelMargin: {
      marginTop: '1.8rem',
      alignSelf: 'start',
    },
    submit: {
      margin: theme.spacing(3, 2, 2),
      padding: 10,
      width: 160,
      height: 56,
      borderRadius: theme.shape.borderRadius,
      marginTop: 49,
      textTransform: 'uppercase',
      fontWeight: 'bold',
    },
    phoneSpan: {
      fontStyle: 'italic',
      fontWeight: 600,
      marginBottom: '0.5rem',
    },
  }));

export default useStyles;
