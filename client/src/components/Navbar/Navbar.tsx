import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../Images/logo.png';
import { AppBar, Button, Toolbar, Typography } from '@material-ui/core';
import useStyles from './useStyles';

export default function Navbar(): JSX.Element {
  const classes = useStyles();
  const { pathname } = useLocation();
  return (
    <div className={classes.root}>
      <AppBar position="static" className={` ${pathname === '/' ? classes.mainPageNavbar : classes.otherPageNavbar}`}>
        <Toolbar>
          <div className={classes.logo}>
            <Link to="/">
              <img src={logo} alt="logo" />
            </Link>
          </div>
          <Typography className={classes.sitterPage}>
            <Link to="#" className={` ${pathname === '/' ? classes.sitterLink : classes.otherSitterLink}`}>
              BECOME A SITTER
            </Link>
          </Typography>
          <div className={classes.login}>
            <Link to="/login" className={classes.removeLink}>
              <Button
                variant="outlined"
                color="inherit"
                className={` ${pathname === '/' ? classes.loginBtn : classes.otherLoginBtn}`}
              >
                LOGIN
              </Button>
            </Link>
          </div>
          <Link to="/Signup" className={classes.removeLink}>
            <Button variant="contained" color="secondary" className={classes.signUpBtn}>
              SIGN UP
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}
