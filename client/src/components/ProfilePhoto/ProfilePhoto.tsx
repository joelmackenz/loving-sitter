import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

import useStyles from './useStyles';

const ProfilePhoto = (): JSX.Element => {
  const classes = useStyles();
  return (
    <>
      <CardHeader title="Profile Photo" component="h2" className={classes.cardHeader} />
      <Box className={classes.mediaContainer}>
        <CardMedia
          className={classes.media}
          component="img"
          src="https://robohash.org/demoUser@gmail.com.png"
          title="Profile Image"
          alt="Profile Image"
        />
        <Typography color="textSecondary">
          Be sure to use a photo that
          <Box component="span" display="block">
            clearly shows your face
          </Box>
        </Typography>
      </Box>
      <CardContent className={classes.cardContent}>
        <Button variant="outlined" component="label" color="primary" className={classes.upload}>
          Upload a file from your device
          <input type="file" hidden />
        </Button>
        <Button type="button" disableFocusRipple disableRipple>
          <DeleteOutlineIcon />
          <Typography color="textSecondary">Delete photo</Typography>
        </Button>
      </CardContent>
    </>
  );
};

export default ProfilePhoto;
