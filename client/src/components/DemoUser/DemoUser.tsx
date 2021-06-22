import { useState, FC } from 'react';
import { CircularProgress } from '@material-ui/core';
import Button from '@material-ui/core/Button';

import login from '../../helpers/APICalls/login';
import { useSnackBar } from '../../context/useSnackbarContext';
import { useAuth } from '../../context/useAuthContext';

interface Props {
  submit: string;
}

const DemoUser: FC<Props> = ({ submit }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { updateSnackBarMessage } = useSnackBar();
  const { updateLoginContext } = useAuth();

  const handleDemoClick = () => {
    setIsSubmitting(true);
    const email = 'test@user.com';
    const password = 'test1234';
    login(email, password).then((data) => {
      if (data.error) {
        setIsSubmitting(false);
        updateSnackBarMessage(data.error.message);
      } else if (data.success) {
        updateLoginContext(data.success);
      } else {
        // should not get here from backend but this catch is for an unknown issue
        console.error({ data });

        setIsSubmitting(false);
        updateSnackBarMessage('An unexpected error occurred. Please try again');
      }
    });
  };

  return (
    <Button type="submit" variant="contained" color="primary" className={submit} onClick={handleDemoClick}>
      {isSubmitting ? <CircularProgress style={{ color: 'white' }} /> : 'Demo'}
    </Button>
  );
};

export default DemoUser;
