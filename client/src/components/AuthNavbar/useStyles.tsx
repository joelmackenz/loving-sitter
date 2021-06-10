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
    pointerEvents: 'initial',
    display: 'flex',
    flexDirection: 'column',
    paddingBottom: '.5rem',
    paddingTop: '.5rem',
    '&:first-child': {
      marginTop: '1rem',
    },
  },
  notificationTitle: {
    fontWeight: 'bold',
    fontSize: '0.9rem',
  },
  notificationSubtitle: {
    fontSize: '0.7rem',
  },
  notificationDate: {
    fontSize: '0.8rem',
    fontWeight: 'bold',
    marginTop: '0.3rem',
  },
  avatar: {
    justifySelf: 'flex-end',
    margin: '.5rem',
  },
  notificationsPopper: {
    pointerEvents: 'none',
    borderTop: '.25rem solid black',
    width: '450px',
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
  badgeIcon: {
    '& .MuiBadge-anchorOriginTopRightCircle': {
      left: 0,
    },
  },
  linkFlexContainer: {
    display: 'flex',
    marginBottom: '1rem',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.04)',
    },
  },
  avatarSize: {
    marginRight: '1rem',
    width: theme.spacing(8),
    height: theme.spacing(8),
  },
}));

export default useStyles;
