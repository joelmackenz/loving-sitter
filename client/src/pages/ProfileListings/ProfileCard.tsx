import RoomIcon from '@material-ui/icons/Room';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import useStyles from './useStyles';
import { Link } from 'react-router-dom';
import { randomImage } from './dummyProfilePhotos';

import { Profile } from './ProfileListings';

interface ProfileCardProps {
  profile: Profile;
  key?: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profile }) => {
  const classes = useStyles();

  return (
    <Link
      to={{ pathname: `/dashboard/${profile._id}`, state: { previousPath: location.pathname, profile } }}
      className={classes.cardLinkContainer}
    >
      <Card className={classes.card} raised={true}>
        <CardActionArea>
          <CardContent className={classes.cardContentUpper}>
            <Avatar
              className={classes.cardUserAvatar}
              src={profile.profileId[0].profileImg === 'demo' ? randomImage() : profile.profileId[0].profileImg}
              alt=""
            />
            <Typography gutterBottom variant="h5" component="h2" className={classes.cardUserName}>
              {profile.firstName} {profile.lastName}
            </Typography>
            <Typography variant="body2" color="textSecondary" className={classes.cardUserDesc}>
              {profile.profileId[0].description}
            </Typography>
          </CardContent>
          <Grid>
            <Divider orientation="horizontal" />
          </Grid>
          <CardContent className={classes.cardContentLower}>
            <Grid className={classes.cityContainer}>
              <RoomIcon className={classes.roomIcon} />
              <Typography className={classes.cardUserLocation}>{profile.profileId[0].city}</Typography>
            </Grid>
            <Typography className={classes.cardUserRate}>${profile.profileId[0].priceRate}/hr</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
};

export default ProfileCard;
