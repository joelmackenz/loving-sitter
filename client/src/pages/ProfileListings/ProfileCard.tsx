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

import { User } from './dummyUserData';

interface ProfileCardProps {
  user: User;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ user }) => {
  const classes = useStyles();

  const handleClickCard = () => {
    // handle navigating to profile page here
  };

  return (
    <Card className={classes.card} onClick={handleClickCard} raised={true}>
      <CardActionArea>
        <CardContent className={classes.cardContentUpper}>
          <Avatar className={classes.cardAvatar} src={user.image} alt="" />
          <Typography gutterBottom variant="h5" component="h2" style={{ fontWeight: 'bold', marginTop: '.5rem' }}>
            {user.firstName} {user.lastName}
          </Typography>
          <Typography style={{ color: 'grey' }}>{user.title}</Typography>
          <Rating style={{ margin: '.5rem' }} name="read-only" value={user.rating} readOnly />
          <Typography variant="body2" color="textSecondary" style={{ fontWeight: 'bold' }}>
            {user.description}
          </Typography>
        </CardContent>
        <Grid>
          <Divider orientation="horizontal" />
        </Grid>
        <CardContent className={classes.cardContentLower}>
          <Grid className={classes.cityContainer}>
            <RoomIcon className={classes.roomIcon} />
            <Typography style={{ color: 'grey' }}>
              {user.city}, {user.provinceState}
            </Typography>
          </Grid>
          <Typography style={{ fontWeight: 'bold' }}>${user.rate}/hr</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ProfileCard;
