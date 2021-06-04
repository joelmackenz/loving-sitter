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
    padding: theme.spacing(5),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2),
    },
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
    margin: theme.spacing(1, 0, 0, 1),
    [theme.breakpoints.down('sm')]: {
      margin: '0 auto',
    },
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
    [theme.breakpoints.down('sm')]: {
      textAlign: 'left',
      marginTop: '0.5rem',
    },
  },
  form: {
    background: 'white',
    width: '500px',
    maxHeight: '440px',
    padding: '42px',
    [theme.breakpoints.down('sm')]: {
      width: '300px',
    },
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
  },
  marginLeft: {
    marginLeft: theme.spacing(1),
    textAlign: 'left',
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
    },
  },
  paymentIcon: {
    width: '100px',
  },
}));

export default useStyles;
