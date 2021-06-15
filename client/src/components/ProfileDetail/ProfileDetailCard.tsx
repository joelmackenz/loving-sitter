import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from '@material-ui/core';
import defaultCoverImg from '../../Images/default-profile-detail-cover.jpg';
import defaultProfileImg from '../../Images/default-profile-image.jpg';
import useStyles from './useStyles';

interface Props {
  profile: {
    coverImg: string;
    profileImg: string;
    firstName: string;
    lastName: string;
    address: string;
    description: string;
    galleryImg: [string] | null;
  };
}

export default function ProfileDetailCard({ profile }: Props): JSX.Element {
  const classes = useStyles();
  return (
    <Card className={classes.cardContainer}>
      <CardMedia
        image={profile.coverImg ? profile.coverImg : defaultCoverImg}
        title="Contemplative Reptile"
        className={classes.coverImg}
      />
      <CardMedia
        image={profile.profileImg ? profile.profileImg : defaultProfileImg}
        title="Contemplative Reptile"
        className={classes.profileImg}
      />
      <CardContent className={classes.cardContent}>
        <Typography variant="h4" className={classes.profileName}>
          {profile.firstName} {profile.lastName}
        </Typography>
        <Typography variant="h6" color="textSecondary" className={classes.subInfo}>
          Loving pet sitter
        </Typography>
        {profile.address && (
          <Typography className={classes.profileLocation}>
            <LocationOnIcon color="primary" />
            {profile.address}
          </Typography>
        )}
        <Box className={classes.introduction}>
          {profile.description && (
            <Box>
              <Typography variant="h5">About me</Typography>
              <Typography variant="subtitle1">{profile.description}</Typography>
            </Box>
          )}
          <Box>
            {profile.galleryImg?.map((image, index) => {
              <CardMedia key={index} image={image} />;
            })}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
