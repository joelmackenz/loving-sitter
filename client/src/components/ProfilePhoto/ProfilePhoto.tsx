import { useState, ChangeEvent } from 'react';
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
import uploadImagesAPI from '../../helpers/APICalls/uploadImages';

interface ImagesState {
  background: string;
  profile: string;
}

interface UploadImagesState {
  background: string | File;
  profile: string | File;
}

const ProfilePhoto = (): JSX.Element => {
  const [images, setImages] = useState<ImagesState>({
    background: '',
    profile: '',
  });
  const [uploadImages, setUploadImages] = useState<UploadImagesState>({
    background: '',
    profile: '',
  });
  const classes = useStyles();
  const { loggedInUser } = useAuth();
  const { updateSnackBarMessage } = useSnackBar();
  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>): void => {
    if (images.background === '' && event.target.files?.length) {
      const background = URL.createObjectURL(event.target.files[0]);
      setImages((prevState) => ({ ...prevState, background }));
      setUploadImages((prevState) => ({ ...prevState, background: event.target.files![0] }));
    } else if (images.profile === '' && event.target.files?.length) {
      const profile = URL.createObjectURL(event.target.files[0]);
      setImages((prevState) => ({ ...prevState, profile }));
      setUploadImages((prevState) => ({ ...prevState, profile: event.target.files![0] }));
    }
  };

  const handleDeleteIcon = (): void => {
    setImages({
      background: '',
      profile: '',
    });
    setUploadImages({
      background: '',
      profile: '',
    });
  };

  const handleImageUploads = (): void => {
    if (!uploadImages.background && !uploadImages.profile) return;
    const formData = new FormData();
    formData.set('background', uploadImages.background);
    formData.set('profile', uploadImages.profile);
    uploadImagesAPI(formData).then((data: any): void => {
      console.log(data);
      if (data.error) {
        if (data.error.message) {
          updateSnackBarMessage(data.error.message);
        } else {
          updateSnackBarMessage(data.error);
        }
      } else if (data.success) {
        updateSnackBarMessage(data.success);
      } else {
        // should not get here from backend but this catch is for an unknown issue
        console.error({ data });
        updateSnackBarMessage('An unexpected error occurred. Please try again');
      }
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
          title="Background Picture"
          alt="Your Background"
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
            {images.background === ''
              ? `Select Your Background Image`
              : images.profile === ''
              ? `Select Your Profile Image`
              : `Both Files are uploaded.`}
            <input type="file" hidden accept="image/*" onChange={handleImageUpload} />
          </Button>
        </Box>
        <Button type="button" disableFocusRipple disableRipple onClick={handleDeleteIcon}>
          <DeleteOutlineIcon />
          <Typography color="textSecondary">Delete photos</Typography>
        </Button>
        <Box textAlign="center">
          <Button
            type="submit"
            size="large"
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleImageUploads}
          >
            Save
          </Button>
        </Box>
      </CardContent>
    </>
  );
};

export default ProfilePhoto;
