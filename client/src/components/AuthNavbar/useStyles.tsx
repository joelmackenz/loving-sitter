import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => {
  return {
    navbarDesktop: {
      display: 'flex',
      alignItems: 'center',
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
      zIndex: 9999,
    },
    profilePopper: {
      backgroundColor: 'white',
      border: '1px solid lightgrey',
      borderRadius: '5px',
      zIndex: 9999,
    },
    badgeIcon: {
      '& span': {
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
    mobileIcon: {
      edge: 'start',
      color: 'black',
      'aria-label': 'menu',
      'aria-haspopup': 'true',
    },
    header: {
      backgroundColor: 'white',
      padding: '0 2rem',
      [theme.breakpoints.down('sm')]: {
        paddingLeft: 0,
        paddingRight: 0,
      },
    },
    logo: {
      textAlign: 'left',
    },
    toolbar: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    drawerContainer: {
      padding: '20px 30px',
    },
    mobileToolbar: {
      display: 'flex',
      flexDirection: 'row-reverse',
      justifyContent: 'space-between',
    },
    notificationButtonContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      margin: '1rem 0',
    },
    acceptButton: {
      color: 'green',
      border: '1px solid green',
      '&:hover': {
        border: '1px solid green',
      },
    },
    declineButton: {
      color: 'red',
      border: '1px solid red',
    },
  };
});

export default useStyles;
