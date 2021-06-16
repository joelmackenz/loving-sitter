import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../../Images/logo.png';
import { AppBar, Button, Toolbar, Typography } from '@material-ui/core';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import { useMediaQuery } from '@material-ui/core';

import useStyles from './useStyles';
import authNavbarUseStyles from '../AuthNavbar/useStyles';

const headersData = [
  {
    label: 'Login',
    href: '/login',
  },
  {
    label: 'SignUp',
    href: '/signup',
  },
  {
    label: 'Become a Sitter',
    href: '/',
  },
];

export default function LandingNavbar(): JSX.Element {
  const classes = useStyles();
  const { toolbar, mobileIcon, mobileToolbar, drawerContainer, logo, linkItem, navbarDesktop, links } =
    authNavbarUseStyles();
  const { pathname } = useLocation();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const isMobileView = useMediaQuery('(max-width:600px)');

  const handleDrawerClose = () => setIsDrawerOpen(false);

  const displayDesktop = (
    <Toolbar className={toolbar}>
      <Link to="/">
        <img src={Logo} className={logo} alt="logo" />
      </Link>
      <div className={navbarDesktop}>
        <MenuList className={links}>
          <MenuItem className={classes.menuItem}>
            <Typography className={classes.sitterPage}>
              <Link to="#" className={` ${pathname === '/' ? classes.sitterLink : classes.otherSitterLink}`}>
                BECOME A SITTER
              </Link>
            </Typography>
          </MenuItem>
          <MenuItem className={classes.menuItem}>
            <div className={classes.login}>
              <Button
                component={Link}
                to="/login"
                variant="outlined"
                color="inherit"
                className={` ${pathname === '/' ? classes.loginBtn : classes.otherLoginBtn}`}
              >
                LOGIN
              </Button>
            </div>
          </MenuItem>
          <MenuItem className={classes.menuItem}>
            <Button component={Link} to="/signup" variant="contained" color="primary" className={classes.signUpBtn}>
              SIGN UP
            </Button>
          </MenuItem>
        </MenuList>
      </div>
    </Toolbar>
  );

  const displayMobile = () => {
    const handleDrawerOpen = () => setIsDrawerOpen(true);
    return (
      <Toolbar className={mobileToolbar}>
        <IconButton className={mobileIcon} onClick={handleDrawerOpen}>
          <MenuIcon />
        </IconButton>

        <Drawer anchor="right" open={isDrawerOpen} onClose={handleDrawerClose}>
          <div className={drawerContainer}>{getDrawserChoices()}</div>
        </Drawer>

        <Link to="/">
          <img src={Logo} className={logo} alt="logo" />
        </Link>
      </Toolbar>
    );
  };

  const getDrawserChoices = () => {
    return headersData.map(({ label, href }) => {
      return (
        <MenuItem key={label} onClick={handleDrawerClose}>
          <Link className={linkItem} to={href}>
            {label}
          </Link>
        </MenuItem>
      );
    });
  };

  return (
    <AppBar
      position="fixed"
      className={` ${pathname === '/' ? classes.mainPageNavbar : classes.otherPageNavbar} ${classes.root}`}
    >
      {isMobileView ? displayMobile() : displayDesktop}
    </AppBar>
  );
}
