import { FC } from 'react';
import Box from '@material-ui/core/Box';
import Badge from '@material-ui/core/Badge';
import Avatar from '@material-ui/core/Avatar';

import { makeStyles } from '@material-ui/core/styles';

interface Props {
  sidebar: boolean;
  fullName: string;
  photoUrl: string;
  online: boolean;
}

const useStyles = makeStyles(() => ({
  profilePic: {
    height: 44,
    width: 44,
  },
  badge: {
    height: 13,
    width: 13,
    borderRadius: '50%',
    border: '2px solid white',
    backgroundColor: '#D0DAE9',
  },
  online: {
    backgroundColor: '#1CED84',
  },
  sidebar: {
    marginLeft: 17,
  },
}));

const UserAvatar: FC<Props> = (props) => {
  const classes = useStyles();
  const { sidebar, fullName, photoUrl, online } = props;

  return (
    <Box className={sidebar ? classes.sidebar : ''}>
      <Badge
        classes={{ badge: `${classes.badge} ${online && classes.online}` }}
        variant="dot"
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        overlap="circle"
      >
        <Avatar alt={fullName} src={photoUrl} className={classes.profilePic}></Avatar>
      </Badge>
    </Box>
  );
};

export default UserAvatar;
