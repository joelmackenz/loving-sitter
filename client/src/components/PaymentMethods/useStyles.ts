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
      padding: props.isLessthanSm ? theme.spacing(2) : theme.spacing(5),
    },
    noCardsMessage: {
      fontSize: '1rem',
    },
    newPayment: {
      padding: 10,
      width: 240,
      height: 56,
      borderRadius: theme.shape.borderRadius,
      fontWeight: 'bold',
      fontSize: '0.8rem',
      marginLeft: props.isLessthanSm ? theme.spacing(0) : theme.spacing(1),
      margin: props.isLessthanSm ? '0 auto' : 0,
    },
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputLabelGridContainer: {
      textAlign: 'right',
      alignSelf: 'center',
      marginRight: '0.8rem',
      '& .MuiFormLabel-root': {
        color: 'black',
        fontWeight: 600,
        textTransform: 'uppercase',
        fontSize: '0.8rem',
      },
    },
    form: {
      background: 'white',
      width: '500px',
      maxHeight: '440px',
      padding: '42px',
    },
    buttonContainer: {
      display: 'flex',
      justifyContent: 'space-evenly',
    },
    helperText: {
      fontSize: '0.7rem',
    },
    cardsContainer: {
      margin: theme.spacing(3, 0),
      // '& :first-child.MuiGrid-item': {
      //   paddingRight: theme.spacing(4),
      // },
      // '& :first-child.MuiGrid-spacing-xs-2 > .MuiGrid-item': {
      //   paddingLeft: 0,
      // }
    },
    marginLeft: {
      marginLeft: theme.spacing(1),
    },
  }));

export default useStyles;
