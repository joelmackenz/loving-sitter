import { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import Sidebar from './Sidebar/Sidebar';
import ActiveChat from './ActiveChat/ActiveChat';
import { useSnackBar } from '../../context/useSnackbarContext';
import { getAllConvosWithoutMessages } from '../../helpers/APICalls/conversation';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  gridSidebar: {
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
}));

export default function Messages() {
  const classes = useStyles();
  const { updateSnackBarMessage } = useSnackBar();
  const [conversations, setConversations] = useState<any>([]);
  const [activeConversation, setActiveConversation] = useState<string>('');
  // useEffect(() => {
  //   getAllConvosWithoutMessages().then((data) => {
  //     if (data.error) {
  //       updateSnackBarMessage(data.error);
  //     } else if (data.success) {
  //       setConversations(data.users);
  //     }
  //   });
  // }, []);

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
