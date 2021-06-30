import { useState, useEffect, MouseEvent } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import clsx from 'clsx';
import Box from '@material-ui/core/Box';
import Drawer from '@material-ui/core/Drawer';
import MenuIcon from '@material-ui/icons/Menu';
import AppBar from '@material-ui/core/AppBar';
import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Popper from '@material-ui/core/Popper';
import { Link } from 'react-router-dom';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { useMediaQuery } from '@material-ui/core';
import { Socket } from 'socket.io-client';
import { History } from 'history';

import useStyles from './useStyles';
import Logo from '../../Images/logo.png';
import { useAuth } from '../../context/useAuthContext';
import { useSnackBar } from '../../context/useSnackbarContext';
import { useSocket } from '../../context/useSocketContext';
import { useUser, IUserContext } from '../../context/useUserContext';
import { useMessage, IConversations, DispatchConvos } from '../../context/useMessageContext';
import { User } from '../../context/interface/User';
import { Notification } from '../../interface/Notification';
import {
  getUnreadNotifications,
  updateReadStatus,
  createNotification,
  ICreateNotification,
} from '../../helpers/APICalls/notification';
import { updateRequest } from '../../helpers/APICalls/request';
import { newConvo } from '../../utils/conversation';
import { updateIsDogSitter } from '../../helpers/APICalls/profileFields';

const headersData = [
  {
    label: 'Settings',
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

interface NotificationProps {
  titleAnchor: HTMLElement | null;
  activeNotifications: Notification[];
  userState: IUserContext;
  loggedInUser?: User | null;
  socket: Socket | undefined;
  updateSnackBarMessage: (message: string) => void;
  conversations: IConversations[];
  handleActiveConversations: (conversationId: string) => void;
  dispatchConversations: DispatchConvos;
  history: History;
}

const NotificationPopper: React.FC<NotificationProps> = ({
  titleAnchor,
  activeNotifications,
  userState,
  loggedInUser,
  socket,
  updateSnackBarMessage,
  conversations,
  handleActiveConversations,
  dispatchConversations,
  history,
}) => {
  const classes = useStyles();

  const [buttonClicked, setButtonClicked] = useState<string>('');

  const handleAcceptClick = (notification: Notification) => {
    const requestId = notification.requestId ? notification.requestId : '';
    const accepted = true;
    const declined = false;
    updateRequest(requestId, accepted, declined).then((data) => {
      if (data.error) {
        updateSnackBarMessage(data.error);
      } else if (data.success) {
        setButtonClicked('SERVICE_ACCEPTED');
        const dataToCreateNotification: ICreateNotification = {
          requestId,
          title: `${loggedInUser?.firstName} has accepted your request.`,
          description: 'Dog Sitting',
          type: 'SERVICE_ACCEPTED',
          userReceiverId: notification.userCreatorId._id,
          userCreatorId: loggedInUser?._id ? loggedInUser?._id : '',
          userCreatorProfileImg: userState.profileImg,
        };
        // notification socket data send
        const dataSendToSocket = {
          recipientUserId: notification.userCreatorId,
          createdAt: new Date().toISOString(),
          readStatus: false,
        };

        socket?.emit('new-notification', { ...dataToCreateNotification, ...dataSendToSocket });

        createNotification({ ...dataToCreateNotification }).then((data) => {
          if (data.error) {
            updateSnackBarMessage(data.error);
          }
        });
      }
    });
  };

  const handleDeclineClick = (notification: Notification) => {
    const requestId = notification.requestId ? notification.requestId : '';
    const accepted = false;
    const declined = true;
    updateRequest(requestId, accepted, declined).then((data) => {
      console.log(data);
      if (data.error) {
        updateSnackBarMessage(data.error);
      } else if (data.success) {
        setButtonClicked('SERVICE_DECLINED');
        const dataToCreateNotification: ICreateNotification = {
          requestId,
          title: `${loggedInUser?.firstName} has declined your request.`,
          description: 'Dog Sitting',
          type: 'SERVICE_DECLINED',
          userReceiverId: notification.userCreatorId._id,
          userCreatorId: loggedInUser?._id ? loggedInUser?._id : '',
          userCreatorProfileImg: userState.profileImg,
        };
        // notification socket data send
        const dataSendToSocket = {
          recipientUserId: notification.userCreatorId,
          createdAt: new Date().toISOString(),
          readStatus: false,
        };

        socket?.emit('new-notification', { ...dataToCreateNotification, ...dataSendToSocket });

        createNotification({ ...dataToCreateNotification }).then((data) => {
          if (data.error) {
            updateSnackBarMessage(data.error);
          }
        });
      }
    });
  };

  const handleMessage = (notification: Notification) => {
    const recipientUser = {
      recipientUserId: notification.userCreatorId._id,
      firstName: notification.userCreatorId.firstName,
      lastName: notification.userCreatorId.lastName,
      email: notification.userCreatorId.email,
      profileImg: notification.userCreatorProfileImg,
    };
    newConvo(
      conversations,
      handleActiveConversations,
      recipientUser,
      loggedInUser,
      updateSnackBarMessage,
      userState,
      socket,
      dispatchConversations,
      history,
    );
  };

  return (
    <Popper open={Boolean(titleAnchor)} anchorEl={titleAnchor} className={classes.notificationsPopper}>
      <Box className={classes.notificationContainer}>
        {activeNotifications.length ? (
          activeNotifications.map((notification, index) => (
            <Box className={clsx(classes.linkItem, classes.linkFlexContainer)} key={index}>
              <Avatar
                src={
                  notification.userCreatorProfileImg.length
                    ? notification.userCreatorProfileImg
                    : `https://robohash.org/${notification.userCreatorId.email}.png`
                }
                variant="square"
                className={clsx(classes.avatar, classes.avatarSize)}
              />
              <Box>
                <Typography className={classes.notificationTitle}>{notification.title}</Typography>
                <Typography className={classes.notificationSubtitle} color="textSecondary">
                  {notification.description}
                </Typography>
                <Typography className={classes.notificationDate}>
                  {notification.createdAt.substring(0, 10).replaceAll('-', '/')}
                </Typography>
                {notification.type === 'SERVICE_REQUEST' && (
                  <Box className={classes.notificationButtonContainer}>
                    {buttonClicked === 'SERVICE_ACCEPTED' ? (
                      <p>You have Accepted the request successfully.</p>
                    ) : buttonClicked === 'SERVICE_DECLINED' ? (
                      <p>You have Declined the request successfully.</p>
                    ) : (
                      <>
                        <Button
                          variant="outlined"
                          color="primary"
                          className={classes.acceptButton}
                          onClick={() => handleAcceptClick(notification)}
                        >
                          Accept
                        </Button>
                        <Button
                          variant="outlined"
                          color="primary"
                          className={classes.declineButton}
                          onClick={() => handleDeclineClick(notification)}
                        >
                          Decline
                        </Button>
                      </>
                    )}
                    <Button variant="outlined" color="primary" onClick={() => handleMessage(notification)}>
                      Message
                    </Button>
                  </Box>
                )}
              </Box>
            </Box>
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

export default function AuthNavbar(): JSX.Element {
  const classes = useStyles();

  const location = useLocation();
  const history = useHistory();
  const { logout, loggedInUser, updateLoginFields } = useAuth();
  const { updateSnackBarMessage } = useSnackBar();
  const { userState, dispatchUserContext } = useUser();
  const { conversations, handleActiveConversation, dispatchConversations } = useMessage();
  const { socket } = useSocket();

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

  useEffect(() => {
    if (socket === undefined) return;
    socket.on('new-notification', (data) => {
      setNotifications((prevState) => [{ ...data }, ...prevState]);
    });
    return () => {
      socket.off('new-notification');
    };
  }, [socket]);

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
    const currentUserId = loggedInUser?._id;
    const otherUsersInConvo: string[] = [];
    conversations.forEach((convo) => {
      return otherUsersInConvo.push(convo.recipientUser.recipientUserId);
    });
    if (otherUsersInConvo.length === conversations.length) {
      socket?.emit('logout', { currentUserId, otherUsersInConvo });
    }
    dispatchUserContext({ type: 'EMPTY_IMAGES' });
  };

  const handleSitterClick = () => {
    updateIsDogSitter().then((data) => {
      console.log(data);
      if (data.error) {
        updateSnackBarMessage(data.error);
      } else if (data.success && data.isDogSitter) {
        updateLoginFields(data.isDogSitter);
        history.push({
          pathname: '/settings',
          state: { previousPath: location.pathname },
        });
        updateSnackBarMessage('Fill your Profile, to complete the process.');
      }
    });
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
        <Link to={{ pathname: '/dashboard', state: { previousPath: location.pathname } }}>
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

        <Link to={{ pathname: '/dashboard', state: { previousPath: location.pathname } }}>
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
      const currentUserId = loggedInUser?._id;
      const otherUsersInConvo: string[] = [];
      conversations.forEach((convo) => {
        return otherUsersInConvo.push(convo.recipientUser.recipientUserId);
      });
      if (otherUsersInConvo.length === conversations.length) {
        socket?.emit('logout', { currentUserId, otherUsersInConvo });
      }
      dispatchUserContext({ type: 'EMPTY_IMAGES' });
    };
    return headersData.map(({ label, href }) => {
      return (
        <MenuItem key={label} onClick={() => handleNavMenuClick(label)}>
          {label === 'Logout' ? (
            <div className={classes.linkItem}>{label}</div>
          ) : (
            <Link className={classes.linkItem} to={{ pathname: href, state: { previousPath: location.pathname } }}>
              {label}
            </Link>
          )}
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
          <Link className={classes.linkItem} to={{ pathname: '/settings', state: { previousPath: location.pathname } }}>
            Settings
          </Link>
        </MenuItem>
        <MenuItem
          onClick={() => {
            setProfilePopperAnchor(null);
            handleLogout();
          }}
        >
          <div className={classes.linkItem}>Logout</div>
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
          {loggedInUser?.isDogSitter ? (
            <MenuItem>
              <Link
                to={{ pathname: '/myjobs', state: { previousPath: location.pathname } }}
                className={classes.linkItem}
              >
                My Jobs
              </Link>
            </MenuItem>
          ) : (
            <MenuItem>
              <div className={classes.linkItem} onClick={handleSitterClick}>
                Become a Sitter
              </div>
            </MenuItem>
          )}
          <MenuItem>
            <Link
              to={{ pathname: '/messages', state: { previousPath: location.pathname } }}
              className={classes.linkItem}
            >
              Messages
            </Link>
          </MenuItem>
        </MenuList>
        <IconButton onClick={(e) => handleToggleProfilePopper(e.currentTarget)}>
          <Avatar
            src={userState.profileImg ? userState.profileImg : `https://robohash.org/${loggedInUser?.email}.png`}
            className={classes.avatar}
          />
        </IconButton>
        {profilePopper}
        <NotificationPopper
          userState={userState}
          loggedInUser={loggedInUser}
          titleAnchor={notificationsAnchor}
          activeNotifications={notifications}
          socket={socket}
          updateSnackBarMessage={updateSnackBarMessage}
          conversations={conversations}
          handleActiveConversations={handleActiveConversation}
          dispatchConversations={dispatchConversations}
          history={history}
        />
      </>
    );
  };

  return <AppBar className={classes.header}>{isMobileView ? displayMobile() : displayDesktop()}</AppBar>;
}
