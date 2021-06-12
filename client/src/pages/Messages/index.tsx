import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import Sidebar from './Sidebar/Sidebar';
import ActiveChat from './ActiveChat/ActiveChat';

const useStyles = makeStyles(() => ({
  root: {
    height: '100vh',
  },
  gridSidebar: {
    '@media (max-width: 600px)': {
      display: 'none',
    },
  },
}));

export default function Messages() {
  const classes = useStyles();
  return (
    <Grid container component="main" className={classes.root}>
      <Grid item md={3} sm={4} className={classes.gridSidebar}>
        <Sidebar />
      </Grid>
      <Grid item md={9} sm={8} xs={12}>
        <ActiveChat />
      </Grid>
    </Grid>
  );
}
