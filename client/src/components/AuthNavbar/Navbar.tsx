import { useState, useEffect, MouseEvent } from 'react';
import clsx from 'clsx';
import AppBar from '@material-ui/core/AppBar';
import Badge from '@material-ui/core/Badge';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Popper from '@material-ui/core/Popper';
import { Link } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';

import profileImage from '../../Images/775db5e79c5294846949f1f55059b53317f51e30.png';
import logo from '../../Images/logo.png';
import { useAuth } from '../../context/useAuthContext';
import { useSnackBar } from '../../context/useSnackbarContext';
import useStyles from './useStyles';
import { getUnreadNotifications, updateReadStatus } from '../../helpers/APICalls/notification';
import { Notification } from '../../interface/Notification';

interface ActiveNotification {
  title: string | null;
  description: string | null;
  createdAt: string;
}

interface NotificationProps {
  titleAnchor: HTMLElement | null;
  activeNotifications: ActiveNotification[];
}

const NotificationPopper: React.FC<NotificationProps> = ({ titleAnchor, activeNotifications }) => {
  const classes = useStyles();
  return (
    <Popper open={Boolean(titleAnchor)} anchorEl={titleAnchor} className={classes.notificationsPopper}>
      <Box className={classes.notificationContainer}>
        {activeNotifications.length ? (
          activeNotifications.map((notification, index) => (
            <Link to="/dashboard" className={clsx(classes.linkItem, classes.linkFlexContainer)} key={index}>
              <Avatar src={profileImage} variant="square" className={clsx(classes.avatar, classes.avatarSize)} />
              <Box>
                <Typography className={classes.notificationTitle}>{notification.title}</Typography>
                <Typography className={classes.notificationSubtitle} color="textSecondary">
                  {notification.description}
                </Typography>
                <Typography className={classes.notificationDate}>
                  {notification.createdAt.substring(0, 10).replaceAll('-', '/')}
                </Typography>
              </Box>
            </Link>
          ))
        ) : (
          <Box display="flex" justifyContent="center">
            <Typography>No new notifications</Typography>
          </Box>
        )}
      </Box>
    </Popper>
  );
};

const Navbar: React.FC = () => {
  const classes = useStyles();

  const { logout } = useAuth();
  const { updateSnackBarMessage } = useSnackBar();

  const [profilePopperAnchor, setProfilePopperAnchor] = useState<null | HTMLElement>(null);
  const [notificationsAnchor, setNotificationsAnchor] = useState<null | HTMLElement>(null);
  const [mobilePopperAnchor, setMobilePopperAnchor] = useState<null | HTMLElement>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isNotificationRead, setIsNotificationRead] = useState(false);

  useEffect(() => {
    getUnreadNotifications().then((data) => {
      if (data.error) {
        updateSnackBarMessage(data.error.message);
      } else if (data.success) {
        if (data.notifications?.length) {
          setNotifications(data.notifications);
        } else {
          setNotifications([]);
        }
      } else {
        // should not get here from backend but this catch is for an unknown issue
        console.error({ data });
        updateSnackBarMessage('An unexpected error occurred. Please try again');
      }
    });
  }, []);

  const handleNotificationsClick = (event: MouseEvent<HTMLDivElement>) => {
    setNotificationsAnchor((prevState) => {
      if (!prevState) {
        return event.currentTarget;
      } else {
        return null;
      }
    });

    if (!!notifications.length && isNotificationRead) return;
    setIsNotificationRead(true);
    updateReadStatus(notifications).then((data) => {
      console.log({ data });
    });
  };

  const handleLogout = () => {
    logout();
  };

  const handleToggleProfilePopper = (target: HTMLButtonElement) => {
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
          <Link className={classes.linkItem} to="/settings">
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
          <div className={classes.linkItem} aria-haspopup="true" onClick={handleNotificationsClick}>
            Notifications
            <Badge
              className={classes.badgeIcon}
              color="primary"
              overlap="circle"
              variant="dot"
              invisible={notifications.length && !isNotificationRead ? false : true}
            />
          </div>
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
