import { FC } from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

import Chat from './Chat';
import { IConversations } from '../index';
import Spinner from '../../../components/Spinner/Spinner';

export interface Props {
  conversations: IConversations[];
  handleActiveConversation: (conversationId: string) => void;
  isFetching: boolean;
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
  },
  sidebarConvoContainer: {
    position: 'sticky',
    top: '14%',
    zIndex: 10,
  },
  title: {
    fontSize: 20,
    letterSpacing: -0.29,
    fontWeight: 600,
    paddingTop: theme.spacing(4),
    marginBottom: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const Sidebar: FC<Props> = (props) => {
  const classes = useStyles();
  const { conversations, handleActiveConversation, isFetching } = props;
  return (
    <Paper elevation={3} className={classes.root}>
      {conversations.length ? (
        <Box className={classes.sidebarConvoContainer}>
          <Typography className={classes.title}>Inbox Messages</Typography>
          {conversations.map((conversation: IConversations) => {
            return (
              <Chat
                conversation={conversation}
                key={conversation.recipientUser.recipientUserId}
                handleActiveConversation={handleActiveConversation}
              />
            );
          })}
        </Box>
      ) : !isFetching ? (
        <Box paddingTop="7rem">
          <p>Please, Chat with sitters for any queries.</p>
        </Box>
      ) : (
        <Spinner />
      )}
    </Paper>
  );
};

export default Sidebar;
