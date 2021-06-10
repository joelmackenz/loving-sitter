import { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Popper from '@material-ui/core/Popper';
import { Link } from 'react-router-dom';
import Toolbar from '@material-ui/core/Toolbar';
import profileImage from '../../Images/775db5e79c5294846949f1f55059b53317f51e30.png';
import logo from '../../Images/logo.png';
import { Typography } from '@material-ui/core';
import { useAuth } from '../../context/useAuthContext';
import useStyles from './useStyles';

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

interface ActiveNotification {
  title: string | null;
  subtitle: string | null;
  date: string | null;
}

interface NotificationProps {
  titleAnchor: HTMLElement | null;
  activeNotifications: ActiveNotification[];
}

const NotificationPopper: React.FC<NotificationProps> = ({ titleAnchor, activeNotifications }) => {
  const classes = useStyles();
  return (
    <Popper open={Boolean(titleAnchor)} anchorEl={titleAnchor} className={classes.notificationsPopper}>
      <MenuList autoFocusItem={Boolean(titleAnchor)}>
        <MenuItem>
          <Link className={classes.linkItem} to="/notifications">
            {activeNotifications.map((notification, index) =>
              notification.title !== null ? (
                <Grid key={`${notification.title}-${index}`} className={classes.notificationContainer}>
                  <Typography className={classes.notificationTitle}>{notification.title}</Typography>
                  <Typography className={classes.notificationSubtitle}>{notification.subtitle}</Typography>
                  <Typography className={classes.notificationDate}>{notification.date}</Typography>
                </Grid>
              ) : (
                <Grid key={index}>
                  <Typography>No new notifications</Typography>
                </Grid>
              ),
            )}
          </Link>
        </MenuItem>
      </MenuList>
    </Popper>
  );
};

const Navbar: React.FC = () => {
  const classes = useStyles();

  const { logout } = useAuth();

  const [profilePopperAnchor, setProfilePopperAnchor] = useState<null | HTMLElement>(null);
  const [notificationsAnchor, setNotificationsAnchor] = useState<null | HTMLElement>(null);
  const [mobilePopperAnchor, setMobilePopperAnchor] = useState<null | HTMLElement>(null);

  const handleLogout = () => {
    logout();
  };

  const handleToggleProfilePopper = (target: any) => {
    if (target === profilePopperAnchor) {
      setProfilePopperAnchor(null);
    } else {
      setProfilePopperAnchor(target);
    }
  };

  const profilePopper = (
    <Popper
      className={classes.profilePopper}
      open={Boolean(profilePopperAnchor)}
      anchorEl={profilePopperAnchor}
      onClick={() => setProfilePopperAnchor(null)}
    >
      <MenuList autoFocusItem={Boolean(profilePopperAnchor)} onMouseLeave={() => setProfilePopperAnchor(null)}>
        <MenuItem onClick={() => setProfilePopperAnchor(null)}>
          <Link className={classes.linkItem} to="/profile">
            Profile
          </Link>
        </MenuItem>
        <MenuItem onClick={() => setProfilePopperAnchor(null)}>
          <Link className={classes.linkItem} onClick={handleLogout} to="/">
            Logout
          </Link>
        </MenuItem>
      </MenuList>
    </Popper>
  );

  const mobilePopper = (
    <Popper
      open={Boolean(mobilePopperAnchor)}
      anchorEl={mobilePopperAnchor}
      onClick={() => setMobilePopperAnchor(null)}
    >
      <MenuList autoFocusItem={Boolean(profilePopperAnchor)} onMouseLeave={() => setMobilePopperAnchor(null)}>
        <MenuItem>
          <Link to={`/notifications`} className={classes.linkItem}>
            Notifications
          </Link>
        </MenuItem>
        <MenuItem>
          <Link to={`/myjobs`} className={classes.linkItem}>
            My Jobs
          </Link>
        </MenuItem>
        <MenuItem>
          <Link to={`/messages`} className={classes.linkItem}>
            Messages
          </Link>
        </MenuItem>
      </MenuList>
    </Popper>
  );

  const renderMenu = (
    <Grid className={classes.navbarDesktop}>
      <MenuList className={classes.links}>
        <MenuItem>
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
        <MenuItem>
          <Link to={`/myjobs`} className={classes.linkItem}>
            My Jobs
          </Link>
        </MenuItem>
        <MenuItem>
          <Link to={`/messages`} className={classes.linkItem}>
            Messages
          </Link>
        </MenuItem>
      </MenuList>
      <IconButton onClick={(e) => handleToggleProfilePopper(e.currentTarget)}>
        <Avatar src={profileImage} className={classes.avatar} />
      </IconButton>
      {profilePopper}
      <NotificationPopper titleAnchor={notificationsAnchor} activeNotifications={notifications} />
    </Grid>
  );

  const renderMobileMenu = (
    <Grid className={classes.navbarMobile}>
      <IconButton onMouseEnter={(e) => setMobilePopperAnchor(e.currentTarget)}>
        <MoreHorizIcon />
      </IconButton>
      <IconButton onClick={(e) => setProfilePopperAnchor(e.currentTarget)}>
        <Avatar src={profileImage} className={classes.avatar} />
      </IconButton>
      {mobilePopper}
    </Grid>
  );

  return (
    <AppBar className={classes.appBar}>
      <Toolbar className={classes.navMain}>
        <img src={logo} className={classes.logo} alt="logo" />
        {renderMenu}
        {renderMobileMenu}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
