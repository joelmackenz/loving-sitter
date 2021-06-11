import { useState, useEffect, MouseEvent } from 'react';
import clsx from 'clsx';
import Box from '@material-ui/core/Box';
import Drawer from '@material-ui/core/Drawer';
import MenuIcon from '@material-ui/icons/Menu';
import AppBar from '@material-ui/core/AppBar';
import Badge from '@material-ui/core/Badge';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Popper from '@material-ui/core/Popper';
import { Link } from 'react-router-dom';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { useMediaQuery } from '@material-ui/core';

import useStyles from './useStyles';
import Logo from '../../Images/logo.png';
import profileImage from '../../Images/775db5e79c5294846949f1f55059b53317f51e30.png';
import { useAuth } from '../../context/useAuthContext';
import { useSnackBar } from '../../context/useSnackbarContext';
import { getUnreadNotifications, updateReadStatus } from '../../helpers/APICalls/notification';
import { Notification } from '../../interface/Notification';

const headersData = [
  {
    label: 'Profile',
    href: '/settings',
  },
  {
    label: 'Notifications',
    href: '/dasboard',
  },
  {
    label: 'My Jobs',
    href: '/dashboard',
  },
  {
    label: 'Messages',
    href: '/dashboard',
  },
  {
    label: 'Logout',
    href: '/login',
  },
];

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

export default function AuthNavbar() {
  const classes = useStyles();

  const { logout, loggedInUser } = useAuth();
  const { updateSnackBarMessage } = useSnackBar();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const isMobileView = useMediaQuery('(max-width:600px)');
  const [profilePopperAnchor, setProfilePopperAnchor] = useState<null | HTMLElement>(null);
  const [notificationsAnchor, setNotificationsAnchor] = useState<null | HTMLElement>(null);
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
    setProfilePopperAnchor(null);
    logout();
  };

  const handleToggleProfilePopper = (target: HTMLButtonElement) => {
    if (target === profilePopperAnchor) {
      setProfilePopperAnchor(null);
    } else {
      setProfilePopperAnchor(target);
    }
  };

  const displayDesktop = () => {
    return (
      <Toolbar className={classes.toolbar}>
        <Link to="/dashboard">
          <img src={Logo} className={classes.logo} alt="logo" />
        </Link>
        <div className={classes.navbarDesktop}>{getMenuButtons()}</div>
      </Toolbar>
    );
  };

  const displayMobile = () => {
    const handleDrawerOpen = () => setIsDrawerOpen(true);
    const handleDrawerClose = () => setIsDrawerOpen(false);

    return (
      <Toolbar className={classes.mobileToolbar}>
        <IconButton className={classes.mobileIcon} onClick={handleDrawerOpen}>
          <MenuIcon />
        </IconButton>

        <Drawer anchor="right" open={isDrawerOpen} onClose={handleDrawerClose}>
          <div className={classes.drawerContainer}>{getDrawerChoices()}</div>
        </Drawer>

        <Link to="/dashboard">
          <img src={Logo} className={classes.logo} alt="logo" />
        </Link>
      </Toolbar>
    );
  };

  const getDrawerChoices = () => {
    const handleNavMenuClick = (labelArg: string) => {
      setIsDrawerOpen(false);
      if (labelArg !== 'Logout') return;
      logout();
    };
    return headersData.map(({ label, href }) => {
      return (
        <MenuItem key={label} onClick={() => handleNavMenuClick(label)}>
          <Link className={classes.linkItem} to={href}>
            {label}
          </Link>
        </MenuItem>
      );
    });
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

  const getMenuButtons = () => {
    return (
      <>
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
      </>
    );
  };

  return <AppBar className={classes.header}>{isMobileView ? displayMobile() : displayDesktop()}</AppBar>;
}
