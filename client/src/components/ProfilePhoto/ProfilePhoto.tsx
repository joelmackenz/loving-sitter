import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { useAuth } from '../../context/useAuthContext';
import { useSnackBar } from '../../context/useSnackbarContext';

import useStyles from './useStyles';

interface ImagesState {
  background: string;
  profile: string;
  additionalOne: string;
  additionalTwo: string;
}

const ProfilePhoto = (): JSX.Element => {
  const [images, setImages] = useState<ImagesState>({
    background: '',
    profile: '',
    additionalOne: '',
    additionalTwo: '',
  });
  const classes = useStyles();
  const { loggedInUser } = useAuth();
  const { updateSnackBarMessage } = useSnackBar();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (event.target.files?.length === 2) {
      const background = URL.createObjectURL(event.target.files[0]);
      const profile = URL.createObjectURL(event.target.files[1]);
      // const additionalOne = URL.createObjectURL(event.target.files[2]);
      // const additionalTwo = URL.createObjectURL(event.target.files[3]);
      setImages({ ...images, profile, background });
    } else {
      updateSnackBarMessage('Make sure you upload 2 pictures. 1. background and 2. Profile');
    }
  };

  const handleDeleteIcon = (): void => {
    setImages({
      background: '',
      profile: '',
      additionalOne: '',
      additionalTwo: '',
    });
  };

  return (
    <>
      <CardHeader title="Profile Photo" component="h1" className={classes.cardHeader} />
      <Box className={classes.mediaContainer}>
        <CardMedia
          className={classes.backgroundMedia}
          component="img"
          src={
            images.background
              ? images.background
              : `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmFJpMlEV-41ZFT8U7iUsMJzaXVIL_hAtT9A&usqp=CAU`
          }
          title="User Profile Picture"
          alt="Your Profile"
        />
        <CardMedia
          className={classes.media}
          component="img"
          src={images.profile ? images.profile : `https://robohash.org/${loggedInUser?.email}.png`}
          title="User Profile Picture"
          alt="Your Profile"
        />
      </Box>
      <Typography color="textSecondary" className={classes.profileMediaInfo}>
        Be sure to use a photo that
        <Box component="span" display="block">
          clearly shows your face
        </Box>
      </Typography>
      <CardContent className={classes.cardContent}>
        <Box>
          <Button variant="outlined" component="label" color="primary" className={classes.upload}>
            Upload a file from your device
            <input type="file" hidden accept="image/*" onChange={handleImageUpload} multiple max={2} />
          </Button>
        </Box>
        <Button type="button" disableFocusRipple disableRipple onClick={handleDeleteIcon}>
          <DeleteOutlineIcon />
          <Typography color="textSecondary">Delete photo</Typography>
        </Button>
      </CardContent>
    </>
  );
};

export default ProfilePhoto;
