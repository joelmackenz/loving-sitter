import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'static',
  },
  navMain: {
    backgroundColor: 'white',
    justifyContent: 'space-between',
    position: 'static',
  },
  logo: {
    margin: '1rem',
  },
  navbarDesktop: {
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  navbarMobile: {
    display: 'none',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
    },
  },
  links: {
    display: 'flex',
    flexDirection: 'row',
  },
  linkItem: {
    color: 'black',
    paddingLeft: '.5rem',
    paddingRight: '.5rem',
    fontSize: '1rem',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
  notificationContainer: {
    paddingBottom: '.5rem',
    paddingTop: '.5rem',
  },
  notificationTitle: {
    fontWeight: 'bold',
    fontSize: '1rem',
  },
  notificationSubtitle: {
    fontSize: '.75rem',
  },
  notificationDate: {
    fontSize: '.75rem',
    fontWeight: 'bold',
  },
  avatar: {
    justifySelf: 'flex-end',
    margin: '.5rem',
  },
  notificationsPopper: {
    pointerEvents: 'none',
    borderTop: '.25rem solid black',
    width: '300px',
    backgroundColor: 'white',
    border: '1px solid lightgrey',
    borderRadius: '5px',
  },
  profilePopper: {
    backgroundColor: 'white',
    border: '1px solid lightgrey',
    borderRadius: '5px',
  },
  paper: {
    backgroundColor: 'red',
  },
}));

export default useStyles;
