import { FC, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

import Spinner from '../../../components/Spinner/Spinner';
import Header from './Header';
import Messages from './Messages';
import Input from './Input';
import { IConversations } from '../index';
import { getConvoMessages } from '../../../helpers/APICalls/conversation';
import { useSnackBar } from '../../../context/useSnackbarContext';
import { useAuth } from '../../../context/useAuthContext';
import { useMessage } from '../../../context/useMessageContext';

interface Props {
  activeConversation: string;
  conversation?: IConversations | null;
}

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  chatContainer: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    justifyContent: 'space-between',
  },
}));

const ActiveChat: FC<Props> = (props) => {
  const classes = useStyles();
  const { updateSnackBarMessage } = useSnackBar();
  const { loggedInUser } = useAuth();
  const { dispatchMessages, messages } = useMessage();
  const { activeConversation, conversation } = props;

  useEffect(() => {
    if (activeConversation === '' || messages[activeConversation] !== undefined) return;
    getConvoMessages(activeConversation).then((data) => {
      if (data.error) {
        updateSnackBarMessage(data.error);
      } else if (data.success) {
        dispatchMessages({ type: 'UPDATE_MESSAGES', activeConversation, messages: data.messages });
      } else {
        updateSnackBarMessage('Unexpected Error Occurred. Please try again!');
      }
    });
  }, [activeConversation]);

  return (
    <Box className={classes.root}>
      {messages[activeConversation] && conversation?.recipientUser ? (
        <>
          <Header recipientUser={conversation.recipientUser} />
          <Box className={classes.chatContainer}>
            <Messages
              messages={messages[activeConversation]}
              recipientUser={conversation.recipientUser}
              currentUserId={loggedInUser?._id ? loggedInUser._id : ''}
            />
          </Box>
          <Input
            recipientUser={conversation.recipientUser}
            conversationId={activeConversation}
            dispatchMessages={dispatchMessages}
            currentUserId={loggedInUser?._id ? loggedInUser._id : ''}
          />
        </>
      ) : (
        <Spinner />
      )}
    </Box>
  );
};

export default ActiveChat;
