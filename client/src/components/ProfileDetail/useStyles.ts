import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
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
  },
  profileLocation: {
    marginBottom: '40px',
  },
  introduction: {
    width: '90%',
  },
}));
export default useStyles;
