import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  requestFormText: {
    fontWeight: 900,
    fontSize: '15px',
    marginBottom: '-10px',
  },
  cardContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  coverImg: {
    width: '100%',
    height: '220px',
    objectFit: 'cover',
  },
  profileImg: {
    height: '150px',
    width: '150px',
    borderRadius: '50%',
    objectFit: 'cover',
    transform: 'translateY(-50%)',
    border: '5px solid white',
  },
  cardContent: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  profileName: {
    marginTop: '-75px',
    fontWeight: 'bold',
  },
  subInfo: {
    marginBottom: '20px',
    fontSize: '0.8rem',
  },
  profileLocation: {
    marginBottom: '1rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  introduction: {
    width: '90%',
  },
  inputLabel: {
    fontWeight: 900,
    marginTop: '30px',
    marginBottom: '10px',
    textTransform: 'uppercase',
    color: 'black',
  },
  inputFieldsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      '& :last-child': {
        marginTop: '0.2rem',
      },
    },
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'row',
      '& :last-child': {
        marginTop: '0',
      },
    },
  },
  buttonContainer: {
    marginTop: '1rem',
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      '& :last-child': {
        marginTop: '1rem',
      },
    },
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'row',
      '& :last-child': {
        marginTop: '0',
      },
    },
  },
}));
export default useStyles;
