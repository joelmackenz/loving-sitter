import { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Popover from '@material-ui/core/Popover';
import { Link } from 'react-router-dom';
import Toolbar from '@material-ui/core/Toolbar';
import profileImage from '../../Images/775db5e79c5294846949f1f55059b53317f51e30.png';
import logo from '../../Images/logo.png';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { useAuth } from '../../context/useAuthContext';

// Placeholders simulating data from DB
const notifications: ActiveNotification[] = [
  {
    title: 'Notification 1 Title',
    subtitle: 'Notification 1 Subtitle',
    date: '9/9/2000',
  },
  {
    title: 'Notification 2 Title',
    subtitle: 'Notification 2 Subtitle',
    date: '8/8/2000',
  },
];

const useStyles = makeStyles((theme) => ({
  navMain: {
    backgroundColor: 'white',
    justifyContent: 'space-between',
    position: 'static',
  },
  logo: {
    margin: '1rem',
  },
  linksAvatarContainer: {
    display: 'flex',
    flexDirection: 'row',
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
  popover: {
    pointerEvents: 'none',
  },
  paper: {
    backgroundColor: 'red',
  },
}));

interface ActiveNotification {
  title: string | null;
  subtitle: string | null;
  date: string | null;
}

interface NotificationProps {
  titleAnchor: HTMLElement | null;
  activeNotifications: ActiveNotification[];
}

const NotificationPopover: React.FC<NotificationProps> = ({ titleAnchor, activeNotifications }) => {
  const classes = useStyles();
  return (
    <Popover
      PaperProps={{
        style: {
          borderTop: '.25rem solid black',
          borderRadius: '0px',
          width: '300px',
        },
      }}
      open={Boolean(titleAnchor)}
      anchorEl={titleAnchor}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      className={classes.popover}
    >
      <MenuList autoFocusItem={Boolean(titleAnchor)}>
        <MenuItem>
          <Link className={classes.linkItem} to="/notifications">
            {activeNotifications.map((notification) =>
              notification.title !== null ? (
                <Grid key={null} className={classes.notificationContainer}>
                  <Typography className={classes.notificationTitle}>{notification.title}</Typography>
                  <Typography className={classes.notificationSubtitle}>{notification.subtitle}</Typography>
                  <Typography className={classes.notificationDate}>{notification.date}</Typography>
                </Grid>
              ) : (
                <Grid key={null}>
                  <Typography>No new notifications</Typography>
                </Grid>
              ),
            )}
          </Link>
        </MenuItem>
      </MenuList>
    </Popover>
  );
};

const Navbar: React.FC = () => {
  const classes = useStyles();

  const { logout } = useAuth();

  const [profilePopoverAnchor, setProfilePopoverAnchor] = useState<null | HTMLElement>(null);
  const [notificationsAnchor, setNotificationsAnchor] = useState<null | HTMLElement>(null);

  const handleLogout = () => {
    logout();
  };

  const profilePopover = (
    <Popover
      open={Boolean(profilePopoverAnchor)}
      anchorEl={profilePopoverAnchor}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      onClick={() => setProfilePopoverAnchor(null)}
    >
      <MenuList autoFocusItem={Boolean(profilePopoverAnchor)} onMouseLeave={() => setProfilePopoverAnchor(null)}>
        <MenuItem onClick={() => setProfilePopoverAnchor(null)}>
          <Link className={classes.linkItem} to="/profile">
            Profile
          </Link>
        </MenuItem>
        <MenuItem onClick={() => setProfilePopoverAnchor(null)}>
          <Link className={classes.linkItem} onClick={handleLogout} to="/">
            Logout
          </Link>
        </MenuItem>
      </MenuList>
    </Popover>
  );

  return (
    <AppBar style={{ position: 'static' }}>
      <Toolbar className={classes.navMain}>
        <img src={logo} className={classes.logo} />
        <Grid className={classes.linksAvatarContainer}>
          <MenuList className={classes.links}>
            <MenuItem key={'notifications'}>
              <Link
                to={`/notifications`}
                className={classes.linkItem}
                aria-haspopup="true"
                onMouseOver={(e) => setNotificationsAnchor(e.currentTarget)}
                onMouseLeave={() => setNotificationsAnchor(null)}
              >
                Notifications
              </Link>
            </MenuItem>
            <MenuItem key={'myjobs'}>
              <Link to={`/myjobs`} className={classes.linkItem}>
                My Jobs
              </Link>
            </MenuItem>
            <MenuItem key={'messages'}>
              <Link to={`/messages`} className={classes.linkItem}>
                Messages
              </Link>
            </MenuItem>
          </MenuList>
          <IconButton onClick={(e) => setProfilePopoverAnchor(e.currentTarget)}>
            <Avatar src={profileImage} className={classes.avatar} />
          </IconButton>
          {profilePopover}
          <NotificationPopover titleAnchor={notificationsAnchor} activeNotifications={notifications} />
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
