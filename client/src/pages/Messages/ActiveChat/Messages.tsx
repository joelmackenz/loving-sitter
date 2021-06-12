import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

import SenderBubble from './SenderBubble';
import OtherUserBubble from './OtherUserBubble';

const useStyles = makeStyles({
  chatSubContainer: {
    paddingLeft: 41,
    paddingRight: 41,
    overflow: 'auto',
  },
});

const Messages = (props: any) => {
  const classes = useStyles();
  const { messages, otherUser, userId } = props;

  return (
    <Box className={classes.chatSubContainer}>
      {messages.map((message: any) => {
        // const time = moment(message.createdAt).format("h:mm");
        const time = '';

        return message.senderId === userId ? (
          <SenderBubble key={message.id} text={message.text} time={time} />
        ) : (
          <OtherUserBubble key={message.id} text={message.text} time={time} otherUser={otherUser} />
        );
      })}
    </Box>
  );
};

export default Messages;
