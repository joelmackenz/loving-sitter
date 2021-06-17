import { FC } from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

import BadgeAvatar from './BadgeAvatar';
import ChatContent from './ChatContent';
import { IConversations } from '../index';

export interface IConversation {
  conversation: IConversations;
}

interface Props extends IConversation {
  handleActiveConversation: (conversationId: string) => void;
}

const useStyles = makeStyles({
  root: {
    borderRadius: 8,
    height: 80,
    boxShadow: '0 2px 10px 0 rgba(88,133,196,0.1)',
    display: 'flex',
    alignItems: 'center',
    '&:hover': {
      cursor: 'grab',
    },
  },
});

const Chat: FC<Props> = (props) => {
  const classes = useStyles();
  const { conversation, handleActiveConversation } = props;
  const recipientUser = conversation.recipientUser;

  return (
    <Box onClick={() => handleActiveConversation(conversation.conversationId)} className={classes.root}>
      <BadgeAvatar
        photoUrl={
          recipientUser.profileImg ? recipientUser.profileImg : `https://robohash.org/${recipientUser?.email}.png`
        }
        fullName={recipientUser.fullName}
        online={recipientUser.online}
        sidebar={true}
      />
      <ChatContent conversation={props.conversation} />
    </Box>
  );
};

export default Chat;
