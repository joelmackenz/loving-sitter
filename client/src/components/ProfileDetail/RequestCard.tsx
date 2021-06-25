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

import useStyles from './useStyles';
import { Profile } from '../../pages/ProfileListings/ProfileListings';
import { useSnackBar } from '../../context/useSnackbarContext';
import { useAuth } from '../../context/useAuthContext';
import { createRequest } from '../../helpers/APICalls/request';

interface Props {
  profile: Profile;
}

interface FormValues {
  start_date: string;
  end_date: string;
  dropInTime: string;
  dropOffTime: string;
}

export default function RequestCard({ profile }: Props): JSX.Element {
  const classes = useStyles();
  const { updateSnackBarMessage } = useSnackBar();
  const { loggedInUser } = useAuth();

  const handleSubmit = (values: FormValues, { setSubmitting }: FormikHelpers<FormValues>): void => {
    const { start_date, end_date } = values;
    const user_id = loggedInUser?._id ? loggedInUser._id : '';
    const sitter_id = profile._id;

    createRequest({ start_date, end_date, sitter_id, user_id }).then((data) => {
      if (data.error) {
        updateSnackBarMessage(data.error);
        setSubmitting(false);
      } else if (data.success) {
        updateSnackBarMessage(data.success);
        setSubmitting(false);
      }
    });
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
          dropInTime: '',
          dropOffTime: '',
        }}
        validationSchema={Yup.object().shape({
          start_date: Yup.string().required('Drop In Date is required'),
          end_date: Yup.string().required('Drop Off Date is required'),
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
                  id="dropInTime"
                  name="dropInTime"
                  variant="outlined"
                  helperText={touched.dropInTime ? errors.dropInTime : ''}
                  error={touched.dropInTime && Boolean(errors.dropInTime)}
                  value={values.dropInTime}
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
                  id="dropOffTime"
                  name="dropOffTime"
                  variant="outlined"
                  helperText={touched.dropOffTime ? errors.dropOffTime : ''}
                  error={touched.dropOffTime && Boolean(errors.dropOffTime)}
                  value={values.dropOffTime}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <Box textAlign="center" className={classes.buttonContainer}>
              <Button type="submit" size="large" variant="contained" color="primary">
                {isSubmitting ? <CircularProgress style={{ color: 'white' }} /> : 'Send Request'}
              </Button>
              <Button type="button" size="large" variant="contained" color="primary">
                Send Message
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
}
