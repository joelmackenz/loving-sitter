import Avatar from '@material-ui/core/Avatar';
import { User } from '../../context/interface/User';

interface Props {
  loggedIn: boolean;
  user: User;
}

const AvatarDisplay = ({ user }: Props): JSX.Element => {
  return <Avatar alt="Profile Image" src={`https://robohash.org/${user.email}.png`} />;
};

export default AvatarDisplay;
