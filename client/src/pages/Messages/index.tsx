import { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import Sidebar from './Sidebar/Sidebar';
import ActiveChat from './ActiveChat/ActiveChat';
import { useSnackBar } from '../../context/useSnackbarContext';
import { useMessage } from '../../context/useMessageContext';
import { useSocket } from '../../context/useSocketContext';
import { getAllConvosWithoutMessages } from '../../helpers/APICalls/conversation';

export interface IConversations {
  conversationId: string;
  latestMessage: {
    latestMessageText: string;
    createdAt: string;
  };
  recipientUser: {
    fullName: string;
    email: string;
    online: boolean;
    recipientUserId: string;
    profileImg?: string;
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '99.5vh',
  },
  gridSidebar: {
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
}));

export default function Messages(): JSX.Element {
  const classes = useStyles();
  const { updateSnackBarMessage } = useSnackBar();
  const { socket } = useSocket();
  const { dispatchConversations, conversations, activeConversation, handleActiveConversation } = useMessage();

  useEffect(() => {
    getAllConvosWithoutMessages().then((data) => {
      if (data.error) {
        updateSnackBarMessage(data.error);
      } else if (data.success) {
        dispatchConversations({ type: 'UPDATE_CONVOS', conversations: data.conversations });
        handleActiveConversation(data.conversations[0].conversationId);
      }
    });
  }, []);

  useEffect(() => {
    if (socket === undefined) return;

    socket.on('add-online-user', (recipientUserId) => {
      dispatchConversations({ type: 'ADD_ONLINE_USER', recipientUserId });
    });

    socket.on('remove-offline-user', (recipientUserId) => {
      dispatchConversations({ type: 'REMOVE_ONLINE_USER', recipientUserId });
    });

    return () => {
      socket.off('add-online-user');
      socket.off('remove-offline-user');
    };
  }, [socket]);

  const conversation =
    conversations.length > 0
      ? conversations.find((conversation) => conversation.conversationId === activeConversation)
      : null;

  return (
    <Grid container component="main" className={classes.root}>
      <Grid item md={3} sm={4} className={classes.gridSidebar}>
        <Sidebar conversations={conversations} handleActiveConversation={handleActiveConversation} />
      </Grid>
      <Grid item md={9} sm={8} xs={12}>
        <ActiveChat conversation={conversation} activeConversation={activeConversation} />
      </Grid>
    </Grid>
  );
}
