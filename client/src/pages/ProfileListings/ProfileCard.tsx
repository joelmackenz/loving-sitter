import RoomIcon from '@material-ui/icons/Room';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Rating from '@material-ui/lab/Rating';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import useStyles from './useStyles';

import { Profile } from '../../context/interface/Profile';

interface ProfileCardProps {
  profile: Profile;
  key: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profile }) => {
  const classes = useStyles();

  const handleClickCard = () => {
    // handle navigating to profile page here
  };

  return (
    <Card className={classes.card} onClick={handleClickCard} raised={true}>
      <CardActionArea>
        <CardContent className={classes.cardContentUpper}>
          <Avatar className={classes.cardUserAvatar} src={profile.profileImg} alt="" />
          <Typography gutterBottom variant="h5" component="h2" className={classes.cardUserName}>
            {profile.firstName} {profile.lastName}
          </Typography>
          <Typography className={classes.cardUserTitle}>{profile.title}</Typography>
          <Rating className={classes.cardUserRating} name="read-only" /*value={ Rating value }*/ readOnly />
          <Typography variant="body2" color="textSecondary" className={classes.cardUserDesc}>
            {profile.description}
          </Typography>
        </CardContent>
        <Grid>
          <Divider orientation="horizontal" />
        </Grid>
        <CardContent className={classes.cardContentLower}>
          <Grid className={classes.cityContainer}>
            <RoomIcon className={classes.roomIcon} />
            <Typography className={classes.cardUserLocation}>
              {profile.address.city}, {profile.address.provinceState}
            </Typography>
          </Grid>
          <Typography className={classes.cardUserRate}>${profile.priceRate}/hr</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ProfileCard;
