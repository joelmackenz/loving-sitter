import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

import useStyles from './useStyles';

const Settings = () => {
  const classes = useStyles();
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={12} sm={8} md={5}>
        Left
      </Grid>
      <Grid item xs={12} sm={8} md={5} elevation={6} component={Paper} square>
        Hello
      </Grid>
    </Grid>
  );
};

export default Settings;
