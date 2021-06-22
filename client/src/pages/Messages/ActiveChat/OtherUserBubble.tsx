import { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

import { IRecipientUser } from './Header';

interface Props extends IRecipientUser {
  text: string;
  time: string;
}

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
  },
  avatar: {
    height: 30,
    width: 30,
    marginRight: 11,
    marginTop: 6,
  },
  usernameDate: {
    fontSize: 11,
    color: '#BECCE2',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  bubble: {
    backgroundColor: '#f4f4f9',
    borderRadius: '0 10px 10px 10px',
  },
  text: {
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: -0.2,
    padding: 8,
  },
}));

const OtherUserBubble: FC<Props> = (props) => {
  const classes = useStyles();
  const { text, time, recipientUser } = props;
  return (
    <Box className={classes.root}>
      <Avatar
        alt={recipientUser.fullName}
        src={recipientUser.profileImg ? recipientUser.profileImg : `https://robohash.org/${recipientUser?.email}.png`}
        className={classes.avatar}
      ></Avatar>
      <Box>
        <Typography className={classes.usernameDate}>{time}</Typography>
        <Box className={classes.bubble}>
          <Typography className={classes.text}>{text}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default OtherUserBubble;
