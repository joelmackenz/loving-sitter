import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import FilledInput from '@material-ui/core/FilledInput';

import useStyles from './useStyles';

const ProfilePhoto = () => {
  const classes = useStyles();
  return (
    <>
      <CardHeader title="Profile Photo" component="h2" className={classes.cardHeader} />
      <CardContent>
        <FilledInput />
      </CardContent>
    </>
  );
};

export default ProfilePhoto;
