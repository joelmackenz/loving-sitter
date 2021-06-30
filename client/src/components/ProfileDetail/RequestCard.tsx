import { format } from 'date-fns';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';

import useStyles from './useStyles';
import { useMessage } from '../../context/useMessageContext';
import { Profile } from '../../pages/ProfileListings/ProfileListings';
import { createNotification, ICreateNotification } from '../../helpers/APICalls/notification';
import { useSnackBar } from '../../context/useSnackbarContext';
import { useAuth } from '../../context/useAuthContext';
import { useSocket } from '../../context/useSocketContext';
import { useUser } from '../../context/useUserContext';
import { createRequest } from '../../helpers/APICalls/request';
import { newConvo } from '../../utils/conversation';

interface Props {
  profile: Profile;
}

interface FormValues {
  start_date: string;
  end_date: string;
  start_time: string;
  end_time: string;
}
// eslint-disable-next-line
const differenceBetweenTwoTimes = (startValue: any, endValue: any): string => {
  const start = startValue.split(':');
  const end = endValue.split(':');
  const startDate = new Date(0, 0, 0, start[0], start[1], 0);
  const endDate = new Date(0, 0, 0, end[0], end[1], 0);
  let diff = endDate.getTime() - startDate.getTime();
  const hours = Math.floor(diff / 1000 / 60 / 60);
  diff -= hours * 1000 * 60 * 60;
  const minutes = Math.floor(diff / 1000 / 60);

  return (hours < 9 ? '0' : '') + hours + ' hr' + ' ' + (minutes < 9 ? '0' : '') + minutes + ' min';
};

export default function RequestCard({ profile }: Props): JSX.Element {
  const classes = useStyles();
  const { updateSnackBarMessage } = useSnackBar();
  const { loggedInUser } = useAuth();
  const { socket } = useSocket();
  const { handleActiveConversation, conversations, dispatchConversations } = useMessage();
  const { userState } = useUser();

  const history = useHistory();

  const handleSubmit = (values: FormValues, { setSubmitting }: FormikHelpers<FormValues>): void => {
    const user_id = loggedInUser?._id ? loggedInUser._id : '';
    const sitter_id = profile._id;
    const { start_time, end_time } = values;

    createRequest({ ...values, sitter_id, user_id }).then((data) => {
      if (data.error) {
        updateSnackBarMessage(data.error);
        setSubmitting(false);
      } else if (data.success) {
        updateSnackBarMessage(data.success);
        setSubmitting(false);

        const dataToCreateNotification: ICreateNotification = {
          requestId: data.requestId,
          title: `${profile.firstName} has requested your service for ${differenceBetweenTwoTimes(
            start_time,
            end_time,
          )}`,
          description: 'Dog Sitting',
          type: 'SERVICE_REQUEST',
          userReceiverId: profile._id,
          userCreatorId: loggedInUser?._id ? loggedInUser._id : '',
          userCreatorProfileImg: userState.profileImg.length
            ? userState.profileImg
            : `https://robohash.org/${loggedInUser?.email}.png`,
        };
        // notification socket data send
        const dataSendToSocket = {
          recipientUserId: profile._id,
          createdAt: new Date().toISOString(),
          readStatus: false,
          userCreatorId: {
            firstName: loggedInUser?.firstName,
            lastName: loggedInUser?.lastName,
            email: loggedInUser?.email,
            _id: loggedInUser?._id,
          },
        };
        socket?.emit('new-notification', { ...dataToCreateNotification, ...dataSendToSocket });

        createNotification({ ...dataToCreateNotification }).then((data) => {
          console.log(data);
          if (data.error) {
            updateSnackBarMessage(data.error);
          }
        });
      }
    });
  };

  const handleSendMessage = () => {
    const recipientUser = {
      recipientUserId: profile._id,
      firstName: profile.firstName,
      lastName: profile.lastName,
      email: profile.email,
      profileImg: profile.profileId[0].profileImg,
    };
    newConvo(
      conversations,
      handleActiveConversation,
      recipientUser,
      loggedInUser,
      updateSnackBarMessage,
      userState,
      socket,
      dispatchConversations,
      history,
    );
  };

  return (
    <>
      <Box textAlign="center">
        <Typography variant="h4">{`$${profile.profileId[0]?.priceRate}/hr`}</Typography>
      </Box>
      <Formik
        initialValues={{
          start_date: '',
          end_date: '',
          start_time: '',
          end_time: '',
        }}
        validationSchema={Yup.object().shape({
          start_date: Yup.string().required('Drop In Date is required'),
          end_date: Yup.string().required('Drop Off Date is required'),
          start_time: Yup.string().required('Drop In Time is required'),
          end_time: Yup.string().required('Drop Off Time is required'),
        })}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit, handleChange, values, touched, errors, isSubmitting }) => (
          <form onSubmit={handleSubmit} noValidate>
            <Grid container>
              <Grid item xs={12}>
                <InputLabel htmlFor="start_date" className={classes.inputLabel}>
                  Drop In
                </InputLabel>
              </Grid>
              <Grid item xs={12} className={classes.inputFieldsContainer}>
                <TextField
                  type="date"
                  id="start_date"
                  name="start_date"
                  variant="outlined"
                  inputProps={{
                    min: format(new Date(), 'yyyy-MM-dd'),
                  }}
                  helperText={touched.start_date ? errors.start_date : ''}
                  error={touched.start_date && Boolean(errors.start_date)}
                  value={values.start_date}
                  onChange={handleChange}
                />
                <TextField
                  type="time"
                  id="start_time"
                  name="start_time"
                  variant="outlined"
                  helperText={touched.start_time ? errors.start_time : ''}
                  error={touched.start_time && Boolean(errors.start_time)}
                  value={values.start_time}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <InputLabel htmlFor="end_date" className={classes.inputLabel}>
                  Drop Off
                </InputLabel>
              </Grid>
              <Grid item xs={12} className={classes.inputFieldsContainer}>
                <TextField
                  type="date"
                  id="end_date"
                  name="end_date"
                  variant="outlined"
                  inputProps={{
                    min: format(new Date(), 'yyyy-MM-dd'),
                  }}
                  helperText={touched.end_date ? errors.end_date : ''}
                  error={touched.end_date && Boolean(errors.end_date)}
                  value={values.end_date}
                  onChange={handleChange}
                />
                <TextField
                  type="time"
                  id="end_time"
                  name="end_time"
                  variant="outlined"
                  helperText={touched.end_time ? errors.end_time : ''}
                  error={touched.end_time && Boolean(errors.end_time)}
                  value={values.end_time}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <Box textAlign="center" className={classes.buttonContainer}>
              <Button type="submit" size="large" variant="contained" color="primary">
                {isSubmitting ? <CircularProgress style={{ color: 'white' }} /> : 'Send Request'}
              </Button>
              <Button type="button" size="large" variant="contained" color="primary" onClick={handleSendMessage}>
                Send Message
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
}
