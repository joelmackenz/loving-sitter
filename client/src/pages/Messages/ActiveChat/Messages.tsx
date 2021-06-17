import { FC } from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import { format, parseISO } from 'date-fns';

import SenderBubble from './SenderBubble';
import OtherUserBubble from './OtherUserBubble';
import { IMessages } from './ActiveChat';
import { IRecipientUser } from './Header';

interface Props extends IRecipientUser {
  messages: IMessages[];
  currentUserId: string;
}

const useStyles = makeStyles((theme) => ({
  chatSubContainer: {
    paddingLeft: 41,
    paddingRight: 41,
    [theme.breakpoints.down('xs')]: {
      paddingLeft: 11,
      paddingRight: 11,
    },
  },
}));

const Messages: FC<Props> = (props) => {
  const classes = useStyles();
  const { messages, recipientUser, currentUserId } = props;

  return (
    <Box className={classes.chatSubContainer}>
      {messages.map((message: IMessages) => {
        const time = format(parseISO(message.createdAt), 'H:mm');

        return message.author === currentUserId ? (
          <SenderBubble key={message._id} text={message.text} time={time} />
        ) : (
          <OtherUserBubble key={message._id} text={message.text} time={time} recipientUser={recipientUser} />
        );
      })}
    </Box>
  );
};

export default Messages;
