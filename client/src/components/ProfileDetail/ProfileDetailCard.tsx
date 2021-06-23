import LocationOnIcon from '@material-ui/icons/LocationOn';
import { Box, Card, CardContent, CardMedia, Typography } from '@material-ui/core';

import defaultCoverImg from '../../Images/default-profile-detail-cover.jpg';
import defaultProfileImg from '../../Images/default-profile-image.jpg';
import useStyles from './useStyles';
import { Profile } from '../../pages/ProfileListings/ProfileListings';

interface Props {
  profile: Profile;
}

export default function ProfileDetailCard({ profile }: Props): JSX.Element {
  const classes = useStyles();
  return (
    <Card className={classes.cardContainer}>
      <CardMedia
        image={profile.profileId.coverImg ? profile.profileId.coverImg : defaultCoverImg}
        title="Contemplative Reptile"
        className={classes.coverImg}
      />
      <CardMedia
        image={profile.profileId.profileImg ? profile.profileId.profileImg : defaultProfileImg}
        title="Contemplative Reptile"
        className={classes.profileImg}
      />
      <CardContent className={classes.cardContent}>
        <Typography variant="h4" component="h1" className={classes.profileName}>
          {profile.firstName} {profile.lastName}
        </Typography>
        <Typography variant="h6" component="h2" color="textSecondary" className={classes.subInfo}>
          Loving pet sitter
        </Typography>
        {profile.profileId.city && (
          <Box className={classes.profileLocation}>
            <LocationOnIcon color="primary" />
            <Typography component="span" display="block">
              {profile.profileId.city}
            </Typography>
          </Box>
        )}
        <Box className={classes.introduction}>
          {profile.profileId.description && (
            <Box>
              <Typography variant="h5" component="h3">
                About me
              </Typography>
              <Typography variant="subtitle1">{profile.profileId.description}</Typography>
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}
