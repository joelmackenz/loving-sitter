import { FC } from 'react';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Grid from '@material-ui/core/Grid';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Checkbox from '@material-ui/core/Checkbox';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';

import { useSnackBar } from '../../context/useSnackbarContext';
import { useAuth } from '../../context/useAuthContext';
import useStyles from './useStyles';
import { IUseUser, AvailableDays } from '../../context/useUserContext';
import { updateAuthFields, createOrUpdateProfileFields } from '../../helpers/APICalls/profileFields';

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  description: string;
  availableDays: AvailableDays[];
  priceRate: string;
  [key: string]: string | AvailableDays[];
}

interface Props extends IUseUser {
  handleChangedAnything: () => void;
  handleChangedAnythingToFalse: () => void;
}

type DaysName = 'sun' | 'mon' | 'tues' | 'wed' | 'thurs' | 'fri' | 'sat';

interface FormCheckBox {
  id: number;
  label: string;
  value: DaysName;
}

const formCheckBoxes: FormCheckBox[] = [
  { id: 1, label: 'Sunday', value: 'sun' },
  { id: 2, label: 'Monday', value: 'mon' },
  { id: 3, label: 'Tuesday', value: 'tues' },
  { id: 4, label: 'Wednesday', value: 'wed' },
  { id: 5, label: 'Thursday', value: 'thurs' },
  { id: 6, label: 'Friday', value: 'fri' },
  { id: 7, label: 'Saturday', value: 'sat' },
];

const EditProfile: FC<Props> = (props) => {
  const classes = useStyles();
  const { userState, dispatchUserContext, handleChangedAnything, handleChangedAnythingToFalse } = props;
  const { loggedInUser } = useAuth();
  const { updateSnackBarMessage } = useSnackBar();

  const handleSubmit = (values: FormValues, { setSubmitting }: FormikHelpers<FormValues>): void => {
    // calling this function will not display confirm box to user
    handleChangedAnythingToFalse();
    let authFieldsChange = true;
    let otherFieldsChange = true;
    const { firstName, lastName, ...otherValues } = values;
    // if any fields has changes only then we have to fire a request
    if (loggedInUser?.firstName === firstName && loggedInUser?.lastName === lastName) {
      authFieldsChange = false;
    }
    // if any fields has changes only then we have to fire a request
    for (const key in userState) {
      if (
        key !== 'coverImg' &&
        key !== 'profileImg' &&
        key !== 'isDogSitter' &&
        key !== 'isAvailable' &&
        userState[key] === otherValues[key] &&
        Object.entries(userState['availableDays']).toString() ===
          Object.entries(otherValues['availableDays']).toString()
      ) {
        otherFieldsChange = false;
      } else if (key !== 'coverImg' && key !== 'profileImg' && key !== 'isDogSitter' && key !== 'isAvailable') {
        otherFieldsChange = true;
      }
    }

    if (authFieldsChange) {
      updateAuthFields(firstName, lastName).then((data) => {
        if (data.error) {
          setSubmitting(false);
          updateSnackBarMessage(data.error);
        } else if (data.success) {
          setSubmitting(false);
          // TODO: Also update local state of loggedInUser in AuthContext
          updateSnackBarMessage(data.success);
        }
      });
    }
    if (!otherFieldsChange) {
      setSubmitting(false);
      updateSnackBarMessage("Your don't changed any field values.");
      otherFieldsChange = true;
      return;
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
            availableDays: userState.availableDays.length ? userState.availableDays : [],
            priceRate: userState.priceRate ? userState.priceRate : '',
          }}
          validationSchema={Yup.object().shape({
            firstName: Yup.string().required('First Name is required').max(30, 'First Name is too long'),
            lastName: Yup.string().required('Last Name is required').max(30, 'Last Name is too long'),
            email: Yup.string().required('Email is required').email('Email is not valid'),
            description: loggedInUser?.isDogSitter ? Yup.string().required('Description is required.') : Yup.string(),
            city: Yup.string().required('City is required.'),
            phone: Yup.string()
              .required('Please, enter your phone number')
              .matches(/^[0-9]+$/, 'Must contain numbers only')
              .length(10, 'Number must be 10 digits'),
            priceRate: loggedInUser?.isDogSitter
              ? Yup.string()
                  .required('Please, enter your Price Rate')
                  .matches(/^[0-9]+$/, 'Must contain numbers only')
                  .max(2, 'Value must be less than $100')
              : Yup.string(),
          })}
          onSubmit={handleSubmit}
        >
          {({ handleSubmit, handleChange, values, touched, errors, isSubmitting, setValues }) => (
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
                    onChange={(event) => {
                      if (event.target.value !== loggedInUser?.firstName) {
                        handleChangedAnything();
                      } else {
                        handleChangedAnythingToFalse();
                      }
                      return handleChange(event);
                    }}
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
                    onChange={(event) => {
                      if (event.target.value !== loggedInUser?.lastName) {
                        handleChangedAnything();
                      } else {
                        handleChangedAnythingToFalse();
                      }
                      return handleChange(event);
                    }}
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
                    onChange={(event) => {
                      if (event.target.value !== loggedInUser?.email) {
                        handleChangedAnything();
                      } else {
                        handleChangedAnythingToFalse();
                      }
                      return handleChange(event);
                    }}
                    disabled
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
                    onChange={(event) => {
                      if (event.target.value !== userState.phone) {
                        handleChangedAnything();
                      } else {
                        handleChangedAnythingToFalse();
                      }
                      return handleChange(event);
                    }}
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
                    onChange={(event) => {
                      if (event.target.value !== userState.city) {
                        handleChangedAnything();
                      } else {
                        handleChangedAnythingToFalse();
                      }
                      return handleChange(event);
                    }}
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
                        onChange={(event) => {
                          if (event.target.value !== userState.description) {
                            handleChangedAnything();
                          } else {
                            handleChangedAnythingToFalse();
                          }
                          return handleChange(event);
                        }}
                        required
                      />
                    </Grid>
                    <Grid
                      item
                      md={3}
                      xs={12}
                      className={`${classes.inputLabelGridContainer} ${classes.inputLabelMargin}`}
                    >
                      <FormLabel component="legend">Availability</FormLabel>
                    </Grid>
                    <Grid item md={7} xs={12}>
                      <FormControl component="fieldset">
                        <FormGroup>
                          {formCheckBoxes.map((checkbox) => (
                            <FormControlLabel
                              key={checkbox.id}
                              control={
                                <Checkbox
                                  color="primary"
                                  checked={values.availableDays.includes(checkbox.value)}
                                  onChange={(event) => {
                                    handleChangedAnything();
                                    setValues((prevState) => {
                                      if (event.target.checked) {
                                        const checkedName = checkbox.value;
                                        return {
                                          ...prevState,
                                          availableDays: [...prevState.availableDays, checkedName],
                                        };
                                      } else {
                                        const availableDays = prevState.availableDays;
                                        const indexOf = availableDays.indexOf(checkbox.value);
                                        if (indexOf > -1) {
                                          availableDays.splice(indexOf, 1);
                                          return {
                                            ...prevState,
                                            availableDays,
                                          };
                                        }
                                        return prevState;
                                      }
                                    });
                                  }}
                                  name={checkbox.value}
                                />
                              }
                              label={checkbox.label}
                            />
                          ))}
                        </FormGroup>
                      </FormControl>
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
                        onChange={(event) => {
                          if (event.target.value !== userState.priceRate) {
                            handleChangedAnything();
                          } else {
                            handleChangedAnythingToFalse();
                          }
                          return handleChange(event);
                        }}
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
