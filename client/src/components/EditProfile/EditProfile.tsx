import { FC } from 'react';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Grid from '@material-ui/core/Grid';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { format } from 'date-fns';

import { useSnackBar } from '../../context/useSnackbarContext';
import { useAuth } from '../../context/useAuthContext';
import useStyles from './useStyles';
import { IUseUser } from '../../context/useUserContext';
import { updateAuthFields, createOrUpdateProfileFields } from '../../helpers/APICalls/profileFields';

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  description: string;
  startDate: string;
  endDate: string;
  priceRate: string;
}

const EditProfile: FC<IUseUser> = (props) => {
  const classes = useStyles();
  const { userState, dispatchUserContext } = props;
  const { loggedInUser } = useAuth();
  const { updateSnackBarMessage } = useSnackBar();

  const handleSubmit = (values: FormValues, { setSubmitting }: FormikHelpers<FormValues>): void => {
    // handle form values;
    let authFieldsChange = true;
    const { firstName, email, lastName, ...otherValues } = values;
    if (loggedInUser?.firstName === firstName && loggedInUser?.email === email && loggedInUser?.lastName === lastName) {
      authFieldsChange = false;
    }

    if (authFieldsChange) {
      updateAuthFields(firstName, lastName, email).then((data) => {
        if (data.error) {
          updateSnackBarMessage(data.error);
        }
      });
    }

    createOrUpdateProfileFields(otherValues).then((data) => {
      if (data.error) {
        setSubmitting(false);
        updateSnackBarMessage(data.error);
      } else if (data.success) {
        setSubmitting(false);
        if (data.profile) {
          dispatchUserContext({ type: 'UPDATE_EDIT_PROFILE_FIELDS', fields: data.profile });
        }
        updateSnackBarMessage(data.success);
      } else {
        // should not get here from backend but this catch is for an unknown issue
        console.error({ data });

        setSubmitting(false);
        updateSnackBarMessage('An unexpected error occurred. Please try again');
      }
    });
  };
  return (
    <>
      <CardHeader title="Edit Profile" component="h1" className={classes.cardHeader} />
      <CardContent className={classes.cardContent}>
        <Formik
          initialValues={{
            firstName: loggedInUser?.firstName ? loggedInUser.firstName : '',
            lastName: loggedInUser?.lastName ? loggedInUser.lastName : '',
            email: loggedInUser?.email ? loggedInUser.email : '',
            phone: userState.phone ? userState.phone : '',
            city: userState.city ? userState.city : '',
            description: userState.description ? userState.description : '',
            startDate: userState.startDate ? userState.startDate : '',
            endDate: userState.endDate ? userState.endDate : '',
            priceRate: userState.priceRate ? userState.priceRate : '',
          }}
          validationSchema={Yup.object().shape({
            firstName: Yup.string().required('First Name is required').max(30, 'First Name is too long'),
            lastName: Yup.string().required('Last Name is required').max(30, 'Last Name is too long'),
            email: Yup.string().required('Email is required').email('Email is not valid'),
            description: loggedInUser?.isDogSitter ? Yup.string().required('Description is required.') : Yup.string(),
            city: Yup.string().required('City is required.'),
            startDate: loggedInUser?.isDogSitter ? Yup.string().required('Start Date is required.') : Yup.string(),
            endDate: loggedInUser?.isDogSitter ? Yup.string().required('End Date is required.') : Yup.string(),
            phone: Yup.string()
              .required('Please, enter your phone number')
              .matches(/^[0-9]+$/, 'Must contain numbers only')
              .length(10, 'Number must be 10 digits'),
            priceRate: loggedInUser?.isDogSitter
              ? Yup.string()
                  .required('Please, enter your phone number')
                  .matches(/^[0-9]+$/, 'Must contain numbers only')
                  .max(3, 'Value must br less than $100')
              : Yup.string(),
          })}
          onSubmit={handleSubmit}
        >
          {({ handleSubmit, handleChange, values, touched, errors, isSubmitting }) => (
            <form onSubmit={handleSubmit} noValidate>
              <Grid container>
                <Grid item md={3} xs={12} className={classes.inputLabelGridContainer}>
                  <InputLabel htmlFor="firstName">First Name</InputLabel>
                </Grid>
                <Grid item md={7} xs={12}>
                  <TextField
                    id="firstName"
                    fullWidth
                    margin="normal"
                    name="firstName"
                    autoComplete="firstName"
                    autoFocus
                    variant="outlined"
                    placeholder="John"
                    helperText={touched.firstName ? errors.firstName : ''}
                    error={touched.firstName && Boolean(errors.firstName)}
                    value={values.firstName}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item md={3} xs={12} className={classes.inputLabelGridContainer}>
                  <InputLabel htmlFor="lastName">Last Name</InputLabel>
                </Grid>
                <Grid item md={7} xs={12}>
                  <TextField
                    id="lastName"
                    fullWidth
                    margin="normal"
                    name="lastName"
                    autoComplete="lastName"
                    variant="outlined"
                    placeholder="Doe"
                    helperText={touched.lastName ? errors.lastName : ''}
                    error={touched.lastName && Boolean(errors.lastName)}
                    value={values.lastName}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item md={3} xs={12} className={classes.inputLabelGridContainer}>
                  <InputLabel htmlFor="email">Email Address</InputLabel>
                </Grid>
                <Grid item md={7} xs={12}>
                  <TextField
                    type="email"
                    id="email"
                    fullWidth
                    margin="normal"
                    name="email"
                    autoComplete="email"
                    variant="outlined"
                    placeholder="johndoe@gmail.com"
                    helperText={touched.email ? errors.email : ''}
                    error={touched.email && Boolean(errors.email)}
                    value={values.email}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item md={3} xs={12} className={classes.inputLabelGridContainer}>
                  <InputLabel htmlFor="phone">Phone Number</InputLabel>
                </Grid>
                <Grid item md={7} xs={12}>
                  <TextField
                    type="tel"
                    id="phone"
                    fullWidth
                    margin="normal"
                    name="phone"
                    autoComplete="phone"
                    variant="outlined"
                    placeholder="Phone Number 647777702"
                    helperText={touched.phone ? errors.phone : ''}
                    error={touched.phone && Boolean(errors.phone)}
                    value={values.phone}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item md={3} xs={12} className={classes.inputLabelGridContainer}>
                  <InputLabel htmlFor="city">Where You Live</InputLabel>
                </Grid>
                <Grid item md={7} xs={12}>
                  <TextField
                    id="city"
                    fullWidth
                    margin="normal"
                    name="city"
                    autoComplete="city"
                    variant="outlined"
                    placeholder="City - Toronto"
                    helperText={touched.city ? errors.city : ''}
                    error={touched.city && Boolean(errors.city)}
                    value={values.city}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                {loggedInUser?.isDogSitter && (
                  <>
                    <Grid
                      item
                      md={3}
                      xs={12}
                      className={`${classes.inputLabelGridContainer} ${classes.inputLabelMargin}`}
                    >
                      <InputLabel htmlFor="description">Describe Yourself</InputLabel>
                    </Grid>
                    <Grid item md={7} xs={12}>
                      <TextField
                        id="description"
                        fullWidth
                        margin="normal"
                        name="description"
                        autoComplete="description"
                        variant="outlined"
                        placeholder="About you"
                        multiline
                        rows={6}
                        helperText={touched.description ? errors.description : ''}
                        error={touched.description && Boolean(errors.description)}
                        value={values.description}
                        onChange={handleChange}
                        required
                      />
                    </Grid>
                    <Grid
                      item
                      md={3}
                      xs={12}
                      className={`${classes.inputLabelGridContainer} ${classes.inputLabelMargin}`}
                    >
                      <InputLabel htmlFor="startDate">start Date</InputLabel>
                    </Grid>
                    <Grid item md={7} xs={12}>
                      <TextField
                        type="date"
                        id="startDate"
                        fullWidth
                        margin="normal"
                        name="startDate"
                        inputProps={{
                          min: format(new Date(), 'yyyy-MM-dd'),
                        }}
                        autoComplete="startDate"
                        variant="outlined"
                        placeholder="Start Date"
                        helperText={touched.startDate ? errors.startDate : ''}
                        error={touched.startDate && Boolean(errors.startDate)}
                        value={values.startDate}
                        onChange={handleChange}
                        required
                      />
                    </Grid>
                    <Grid
                      item
                      md={3}
                      xs={12}
                      className={`${classes.inputLabelGridContainer} ${classes.inputLabelMargin}`}
                    >
                      <InputLabel htmlFor="endDate">end Date</InputLabel>
                    </Grid>
                    <Grid item md={7} xs={12}>
                      <TextField
                        type="date"
                        id="endDate"
                        fullWidth
                        margin="normal"
                        name="endDate"
                        autoComplete="endDate"
                        variant="outlined"
                        inputProps={{
                          min: format(new Date(), 'yyyy-MM-dd'),
                        }}
                        placeholder="End Date"
                        helperText={touched.endDate ? errors.endDate : ''}
                        error={touched.endDate && Boolean(errors.endDate)}
                        value={values.endDate}
                        onChange={handleChange}
                        required
                      />
                    </Grid>
                    <Grid
                      item
                      md={3}
                      xs={12}
                      className={`${classes.inputLabelGridContainer} ${classes.inputLabelMargin}`}
                    >
                      <InputLabel htmlFor="priceRate">Price</InputLabel>
                    </Grid>
                    <Grid item md={7} xs={12}>
                      <TextField
                        type="text"
                        id="priceRate"
                        fullWidth
                        margin="normal"
                        name="priceRate"
                        autoComplete="priceRate"
                        variant="outlined"
                        placeholder="Your Price per day in US $"
                        helperText={touched.priceRate ? errors.priceRate : ''}
                        error={touched.priceRate && Boolean(errors.priceRate)}
                        value={values.priceRate}
                        onChange={handleChange}
                        required
                      />
                    </Grid>
                  </>
                )}
              </Grid>
              <Box textAlign="center">
                <Button type="submit" size="large" variant="contained" color="primary" className={classes.submit}>
                  {isSubmitting ? <CircularProgress style={{ color: 'white' }} /> : 'Save'}
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </CardContent>
    </>
  );
};

export default EditProfile;
