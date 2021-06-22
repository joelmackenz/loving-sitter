import { useState, FC, FormEvent, ChangeEvent } from 'react';
import FormControl from '@material-ui/core/FormControl';
import FilledInput from '@material-ui/core/FilledInput';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { nanoid } from 'nanoid';

import { IRecipientUser } from '../ActiveChat/Header';
import { DispatchMessages } from '../../../context/useMessageContext';
import { addMessage } from '../../../helpers/APICalls/message';

interface Props extends IRecipientUser {
  conversationId: string;
  currentUserId: string;
  dispatchMessages: DispatchMessages;
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
  const { currentUserId, recipientUser, conversationId, dispatchMessages } = props;
  const [text, setText] = useState<string>('');
  const classes = useStyles();
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => setText(event.target.value);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (text === '') return;
    // add sender user info if posting to a brand new convo, so that the other user will have access to username, profile pic, etc.
    const message = {
      _id: nanoid(),
      text: text,
      author: currentUserId,
      createdAt: new Date().toISOString(),
    };
    window.scrollTo(0, document.body.scrollHeight);
    dispatchMessages({ type: 'ADD_NEW_MESSAGE', activeConversation: conversationId, message });
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
