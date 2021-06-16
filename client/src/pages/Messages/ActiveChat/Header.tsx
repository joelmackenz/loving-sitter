import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { useMediaQuery } from '@material-ui/core';

import BadgeAvatar from '../Sidebar/BadgeAvatar';
import Sidebar from '../Sidebar/Sidebar';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '1rem',
    justifyContent: 'space-between',
    height: 89,
    boxShadow: '0 2px 20px 0 rgba(88,133,196,0.10)',
  },
  content: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: 24,
    [theme.breakpoints.down('xs')]: {
      marginLeft: 0,
    },
  },
  username: {
    fontSize: 20,
    letterSpacing: -0.29,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    marginLeft: 14,
  },
  statusText: {
    fontSize: 12,
    color: '#BFC9DB',
    letterSpacing: -0.17,
  },
  statusDot: {
    height: 8,
    width: 8,
    borderRadius: '50%',
    marginRight: 5,
    backgroundColor: '#D0DAE9',
  },
  online: {
    background: '#1CED84',
  },
  ellipsis: {
    color: 'black',
    marginRight: 24,
    opacity: 0.5,
  },
  mobileIcon: {
    edge: 'start',
    color: 'black',
    'aria-label': 'menu',
    'aria-haspopup': 'true',
  },
}));

const Header = (props: any) => {
  const classes = useStyles();
  const isMobileView = useMediaQuery('(max-width:600px)');
  const { username, otherUser } = props;
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const handleDrawerOpen = () => setIsDrawerOpen(true);
  const handleDrawerClose = () => setIsDrawerOpen(false);
  return (
    <Box className={classes.root}>
      {isMobileView && (
        <>
          <IconButton className={classes.mobileIcon} onClick={handleDrawerOpen}>
            <MenuIcon />
          </IconButton>
          <Drawer anchor="left" open={isDrawerOpen} onClose={handleDrawerClose}>
            <Sidebar />
          </Drawer>
        </>
      )}
      <Box className={classes.content}>
        <BadgeAvatar
          photoUrl={otherUser.photoUrl}
          username={otherUser.username}
          online={otherUser.online}
          sidebar={isMobileView ? false : true}
        />
        <Typography className={classes.username}>{username}</Typography>
      </Box>
      <MoreHorizIcon classes={{ root: classes.ellipsis }} />
    </Box>
  );
};

export default Header;
