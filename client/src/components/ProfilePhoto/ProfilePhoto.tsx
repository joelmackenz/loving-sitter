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
import { useUser } from '../../context/useUserContext';

import useStyles from './useStyles';
import uploadImagesAPI from '../../helpers/APICalls/uploadImages';

interface UploadImagesState {
  coverImg: string | File;
  profileImg: string | File;
}

const ProfilePhoto = (): JSX.Element => {
  const [uploadImages, setUploadImages] = useState<UploadImagesState>({
    coverImg: '',
    profileImg: '',
  });
  const { userState, dispatchUserContext } = useUser();
  const classes = useStyles();
  const { loggedInUser } = useAuth();
  const { updateSnackBarMessage } = useSnackBar();
  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>): void => {
    if (userState.coverImg === '' && event.target.files?.length) {
      const coverImg = URL.createObjectURL(event.target.files[0]);
      dispatchUserContext({ type: 'UPLOAD_BACKGROUND', coverImg });
      // eslint-disable-next-line
      setUploadImages((prevState) => ({ ...prevState, coverImg: event.target.files![0] }));
    } else if (userState.profileImg === '' && event.target.files?.length) {
      const profileImg = URL.createObjectURL(event.target.files[0]);
      dispatchUserContext({ type: 'UPLOAD_PROFILE', profileImg });
      // eslint-disable-next-line
      setUploadImages((prevState) => ({ ...prevState, profileImg: event.target.files![0] }));
    }
  };

  const handleDeleteIcon = (): void => {
    dispatchUserContext({ type: 'EMPTY_IMAGES' });
    setUploadImages({
      profileImg: '',
      coverImg: '',
    });
  };

  const handleImageUploads = (): void => {
    if (!uploadImages.coverImg && !uploadImages.profileImg) return;
    const formData = new FormData();
    formData.set('background', uploadImages.coverImg);
    formData.set('profile', uploadImages.profileImg);
    uploadImagesAPI(formData).then((data): void => {
      console.log(data);
      if (data.error) {
        updateSnackBarMessage(data.error);
      } else if (data.success) {
        updateSnackBarMessage(data.success);
        console.log({ data });
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
            userState.coverImg
              ? userState.coverImg
              : `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmFJpMlEV-41ZFT8U7iUsMJzaXVIL_hAtT9A&usqp=CAU`
          }
          title="Background Picture"
          alt="Your Background"
        />
        <CardMedia
          className={classes.media}
          component="img"
          src={userState.profileImg ? userState.profileImg : `https://robohash.org/${loggedInUser?.email}.png`}
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
            {userState.coverImg === ''
              ? `Select Your Background Image`
              : userState.profileImg === ''
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
