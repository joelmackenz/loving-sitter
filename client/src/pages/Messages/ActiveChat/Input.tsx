import { useState, FC, FormEvent, ChangeEvent } from 'react';
import FormControl from '@material-ui/core/FormControl';
import FilledInput from '@material-ui/core/FilledInput';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    justifySelf: 'flex-end',
    marginTop: 15,
    position: 'sticky',
    bottom: 0,
    zIndex: 10,
  },
  input: {
    height: '6rem',
    boxShadow: '0px -4px 3px rgba(50, 50, 50, 0.1)',
    backgroundColor: 'white',
    '@media (max-width: 600px)': {
      height: '3rem',
    },
  },
  formControl: {
    position: 'relative',
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
    bottom: '10%',
    '@media (max-width: 600px)': {
      width: 90,
      height: 35,
      right: 0,
      bottom: '-30%',
    },
  },
}));

interface InputProps {
  otherUser: {
    id: number;
  };
  conversationId: number;
  // user: {};
  classes: {
    root: string;
    input: string;
  };
  // postMessage(reqBody: object): void;
}

const Input = (props: any) => {
  const { user, otherUser, conversationId } = props;
  const [text, setText] = useState<string>('');
  const classes = useStyles();
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => setText(event.target.value);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // add sender user info if posting to a brand new convo, so that the other user will have access to username, profile pic, etc.
    const reqBody = {
      text: text,
      recipientId: otherUser.id,
      conversationId: conversationId,
      sender: conversationId ? null : user,
    };
    // await props.postMessage(reqBody);
    setText('');
  };

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <FormControl fullWidth hiddenLabel className={classes.formControl}>
        <FilledInput
          classes={{ root: classes.input }}
          disableUnderline
          placeholder={`Reply to ${otherUser.username}`}
          value={text}
          name="text"
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
