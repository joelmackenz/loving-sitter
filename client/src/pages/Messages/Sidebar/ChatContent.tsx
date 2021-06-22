import { FC } from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { format, parseISO } from 'date-fns';

import { IConversation } from './Chat';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    marginLeft: 20,
    flexGrow: 1,
    marginRight: '1rem',
  },
  username: {
    fontWeight: 'bold',
    letterSpacing: -0.2,
  },
  previewText: {
    fontSize: 12,
    color: '#9CADC8',
    letterSpacing: -0.17,
  },
  notification: {
    height: 20,
    width: 20,
    backgroundColor: '#3F92FF',
    marginRight: 10,
    color: 'white',
    fontSize: 10,
    letterSpacing: -0.5,
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
}));

const ChatContent: FC<IConversation> = (props) => {
  const classes = useStyles();

  const { conversation } = props;
  const { latestMessage, recipientUser } = conversation;

  return (
    <Box className={classes.root}>
      <Box>
        <Typography className={classes.username}>{recipientUser.fullName}</Typography>
        <Typography className={classes.previewText}>{latestMessage?.latestMessageText}</Typography>
      </Box>
      <Box>
        <Typography className={classes.previewText}>
          {latestMessage?.createdAt ? format(parseISO(latestMessage?.createdAt), 'H:mm') : ''}
        </Typography>
      </Box>
    </Box>
  );
};

export default ChatContent;
