import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { useAuth } from '../../context/useAuthContext';

import useStyles from './useStyles';

const ProfilePhoto = (): JSX.Element => {
  const [imgSrc, setImgSrc] = useState<string>('');
  const classes = useStyles();
  const { loggedInUser } = useAuth();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      const src = URL.createObjectURL(event.target.files[0]);
      setImgSrc(src);
    }
  };

  return (
    <>
      <CardHeader title="Profile Photo" component="h1" className={classes.cardHeader} />
      <Box className={classes.mediaContainer}>
        <CardMedia
          className={classes.media}
          component="img"
          src={imgSrc ? imgSrc : `https://robohash.org/${loggedInUser?.email}.png`}
          title="User Profile Picture"
          alt="Your Profile"
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
          <input type="file" hidden accept="image/*" onChange={handleImageUpload} />
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
