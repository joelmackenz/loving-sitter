import Box from '@material-ui/core/Box';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import useStyles from './useStyles';

const ProfilePhoto = (): JSX.Element => {
  const classes = useStyles();
  return (
    <>
      <CardHeader title="Profile Photo" component="h2" className={classes.cardHeader} />
      <Box textAlign="center" margin="0 auto" className={classes.mediaContainer}>
        <CardMedia
          className={classes.media}
          component="img"
          src="https://robohash.org/demoUser@gmail.com.png"
          title="Profile Image"
          alt="Profile Image"
        />
        <Typography color="textSecondary">Be sure to use a photo that clearly shows your face</Typography>
      </Box>
      <CardContent></CardContent>
    </>
  );
};

export default ProfilePhoto;
