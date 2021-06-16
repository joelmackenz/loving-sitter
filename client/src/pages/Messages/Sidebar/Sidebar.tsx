import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

import Chat from './Chat';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '97%',
    marginTop: '1rem',
  },
  sidebarConvoContainer: {
    position: 'sticky',
    top: 0,
    zIndex: 10,
  },
  title: {
    fontSize: 20,
    letterSpacing: -0.29,
    fontWeight: 600,
    paddingTop: theme.spacing(4),
    marginBottom: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

export default function Sidebar(props: any): JSX.Element {
  const classes = useStyles();
  const conversations = props.conversations || [
    {
      latestMessageText: 'I am good',
      otherUser: {
        username: 'thomas',
        online: true,
        photoUrl: 'https://res.cloudinary.com/dmlvthmqr/image/upload/v1607914467/messenger/thomas_kwzerk.png',
      },
    },
    {
      latestMessageText: 'Heyy good',
      otherUser: {
        username: 'Santiago',
        online: false,
        photoUrl: 'https://res.cloudinary.com/dmlvthmqr/image/upload/v1607914467/messenger/thomas_kwzerk.png',
      },
    },
  ];
  return (
    <Paper elevation={2} className={classes.root}>
      <Box className={classes.sidebarConvoContainer}>
        <Typography className={classes.title}>Inbox Messages</Typography>
        {conversations.map((conversation: any) => {
          return <Chat conversation={conversation} key={conversation.otherUser.username} />;
        })}
      </Box>
    </Paper>
  );
}
