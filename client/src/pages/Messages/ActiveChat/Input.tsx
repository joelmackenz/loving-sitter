import { useState, FC, FormEvent, ChangeEvent, useEffect } from 'react';
import FormControl from '@material-ui/core/FormControl';
import FilledInput from '@material-ui/core/FilledInput';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import { useSocket } from '../../../context/useSocketContext';
import { IRecipientUser } from '../ActiveChat/Header';
import { DispatchMessages, DispatchConvos } from '../../../context/useMessageContext';
import { addMessage } from '../../../helpers/APICalls/message';

interface Props extends IRecipientUser {
  conversationId: string;
  currentUserId: string;
  dispatchMessages: DispatchMessages;
  dispatchConversations: DispatchConvos;
}

const useStyles = makeStyles((theme) => ({
  root: {
    justifySelf: 'flex-end',
    marginTop: 15,
    marginLeft: '4px',
    position: 'sticky',
    bottom: '1%',
    backgroundColor: 'white',
    [theme.breakpoints.down('xs')]: {
      bottom: '0%',
    },
  },
  input: {
    height: '3.5rem',
    boxShadow: '0px -4px 3px rgba(50, 50, 50, 0.1)',
    backgroundColor: 'white',
    [theme.breakpoints.down('xs')]: {
      height: '3rem',
    },
    '&:focused': {
      backgroundColor: 'white',
    },
  },
  formControl: {
    position: 'relative',
    zIndex: 99,
  },
  filledInput: {
    boxShadow: 'none',
    '&:hover': {
      backgroundColor: 'white',
    },
  },
  submit: {
    margin: theme.spacing(3, 2, 2),
    width: 120,
    height: 45,
    marginTop: 49,
    borderRadius: 0,
    fontWeight: 'bold',
    position: 'absolute',
    right: '5%',
    bottom: '-35%',
    [theme.breakpoints.down('xs')]: {
      width: 90,
      height: 35,
      right: 0,
      bottom: '-30%',
    },
  },
}));

const Input: FC<Props> = (props) => {
  const { currentUserId, recipientUser, conversationId, dispatchMessages, dispatchConversations } = props;
  const [text, setText] = useState<string>('');
  const classes = useStyles();
  const { socket } = useSocket();

  // dispatches the new message and latest Message
  const dispatchNewMessage = (data: {
    message: {
      _id: string;
      text: string;
      author: string;
      createdAt: string;
      updatedAt: string;
    };
    activeConversation: string;
  }) => {
    dispatchMessages({ type: 'ADD_NEW_MESSAGE', activeConversation: data.activeConversation, message: data.message });
    dispatchConversations({
      type: 'UPDATE_LATEST_MESSAGE',
      activeConversation: data.activeConversation,
      message: data.message.text,
      createdAt: data.message.createdAt,
    });
  };

  useEffect(() => {
    if (socket === undefined || currentUserId === '') return;

    socket.on('new-message', dispatchNewMessage);

    return () => {
      socket.off('new-message', dispatchNewMessage);
    };
  }, [socket, currentUserId]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => setText(event.target.value);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (text === '') return;

    // add sender user info if posting to a brand new convo, so that the other user will have access to username, profile pic, etc.
    const createdAt = new Date().toISOString();
    const message = {
      _id: Math.random().toString(),
      text: text,
      author: currentUserId,
      createdAt,
      updatedAt: new Date().toISOString(),
    };
    window.scrollTo(0, document.body.scrollHeight);

    const data = {
      message,
      activeConversation: conversationId,
    };

    // dispatch message to local context and dispatch latest message to conversation sidebar
    dispatchNewMessage(data);

    // emit message to recipient user
    socket?.emit('new-message', {
      message,
      recipientUserId: recipientUser.recipientUserId,
      currentUserId,
      activeConversation: conversationId,
    });

    // add message to backend
    addMessage(conversationId, currentUserId, text).then((data) => {
      if (data.error) {
        console.error(data.error);
      } else if (data.success) {
        console.log(data);
      }
    });
    setText('');
  };

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <FormControl fullWidth hiddenLabel className={classes.formControl}>
        <FilledInput
          classes={{ root: classes.input }}
          disableUnderline
          placeholder={`Reply to ${recipientUser.fullName}`}
          value={text}
          name="text"
          className={classes.filledInput}
          onChange={handleChange}
        />
        <Button type="submit" size="large" variant="contained" color="primary" className={classes.submit}>
          Send
        </Button>
      </FormControl>
    </form>
  );
};

export default Input;
