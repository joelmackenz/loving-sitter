import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

import Header from './Header';
import Messages from './Messages';
import Input from './Input';

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

const ActiveChat = (props: any) => {
  const classes = useStyles();
  const user = {
    id: 1,
  };
  const conversation = props.conversation || {
    messages: [
      { senderId: 1, text: 'hello how are you', createdAt: '12121', id: 1212 },
      { senderId: 2, text: 'I am good', createdAt: '12121', id: 122 },
      { senderId: 2, text: 'I am good', createdAt: '12121', id: 123 },
      { senderId: 2, text: 'I am good', createdAt: '12121', id: 124 },
      { senderId: 1, text: 'hello how are you', createdAt: '12121', id: 1213 },
      { senderId: 1, text: 'hello how are you', createdAt: '12121', id: 1214 },
      { senderId: 1, text: 'hello how are you', createdAt: '12121', id: 1215 },
      { senderId: 1, text: 'hello how are you', createdAt: '12121', id: 1216 },
      { senderId: 1, text: 'hello how are you', createdAt: '12121', id: 1217 },
      { senderId: 1, text: 'hello how are you', createdAt: '12121', id: 1218 },
      { senderId: 2, text: 'I am good', createdAt: '12121', id: 124 },
      { senderId: 2, text: 'I am good', createdAt: '12121', id: 125 },
      { senderId: 2, text: 'I am good', createdAt: '12121', id: 126 },
      { senderId: 2, text: 'I am good', createdAt: '12121', id: 127 },
    ],
    otherUser: {
      id: 2,
      username: 'thomas',
      online: true,
      photoUrl: 'https://res.cloudinary.com/dmlvthmqr/image/upload/v1607914467/messenger/thomas_kwzerk.png',
    },
  };

  return (
    <Box className={classes.root}>
      {conversation.otherUser && (
        <>
          <Header username={conversation.otherUser.username} otherUser={conversation.otherUser} />
          <Box className={classes.chatContainer}>
            <Messages messages={conversation.messages} otherUser={conversation.otherUser} userId={user.id} />
          </Box>
          <Input otherUser={conversation.otherUser} conversationId={conversation.id} user={user} />
        </>
      )}
    </Box>
  );
};

export default ActiveChat;
