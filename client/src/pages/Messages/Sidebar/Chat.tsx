import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

import BadgeAvatar from './BadgeAvatar';
import ChatContent from './ChatContent';

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

const Chat = (props: any) => {
  const classes = useStyles();
  const otherUser = props.conversation.otherUser;
  return (
    <Box
      // onClick={() => this.handleClick(this.props.conversation)}
      className={classes.root}
    >
      <BadgeAvatar
        photoUrl={otherUser.photoUrl}
        username={otherUser.username}
        online={otherUser.online}
        sidebar={true}
      />
      <ChatContent conversation={props.conversation} />
    </Box>
  );
};

export default Chat;
