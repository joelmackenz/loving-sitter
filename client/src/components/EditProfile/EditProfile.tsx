import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Grid from '@material-ui/core/Grid';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { Formik } from 'formik';
import * as Yup from 'yup';

import useStyles from './useStyles';

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  whereYouLive: string;
  describeYourself: string;
}

const EditProfile = (): JSX.Element => {
  const classes = useStyles();
  const handleSubmit = (values: FormValues): void => {
    // handle form values;
    console.log(values);
  };
  return (
    <>
      <CardHeader title="Edit Profile" component="h1" className={classes.cardHeader} />
      <CardContent className={classes.cardContent}>
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            whereYouLive: '',
            describeYourself: '',
          }}
          validationSchema={Yup.object().shape({
            firstName: Yup.string().required('First Name is required').max(30, 'First Name is too long'),
            lastName: Yup.string().required('Last Name is required').max(30, 'Last Name is too long'),
            email: Yup.string().required('Email is required').email('Email is not valid'),
            phone: Yup.string()
              .required('Please, enter your phone number')
              .matches(/^[0-9]+$/, 'Must contain numbers only'),
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
                    placeholder="Phone Number 647-777-702"
                    helperText={touched.phone ? errors.phone : ''}
                    error={touched.phone && Boolean(errors.phone)}
                    value={values.phone}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item md={3} xs={12} className={classes.inputLabelGridContainer}>
                  <InputLabel htmlFor="whereYouLive">Where You Live</InputLabel>
                </Grid>
                <Grid item md={7} xs={12}>
                  <TextField
                    id="whereYouLive"
                    fullWidth
                    margin="normal"
                    name="whereYouLive"
                    autoComplete="whereYouLive"
                    variant="outlined"
                    placeholder="Address"
                    helperText={touched.whereYouLive ? errors.whereYouLive : ''}
                    error={touched.whereYouLive && Boolean(errors.whereYouLive)}
                    value={values.whereYouLive}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item md={3} xs={12} className={`${classes.inputLabelGridContainer} ${classes.inputLabelMargin}`}>
                  <InputLabel htmlFor="describeYourself">Describe Yourself</InputLabel>
                </Grid>
                <Grid item md={7} xs={12}>
                  <TextField
                    id="describeYourself"
                    fullWidth
                    margin="normal"
                    name="describeYourself"
                    autoComplete="describeYourself"
                    variant="outlined"
                    placeholder="About you"
                    multiline
                    rows={6}
                    helperText={touched.describeYourself ? errors.describeYourself : ''}
                    error={touched.describeYourself && Boolean(errors.describeYourself)}
                    value={values.describeYourself}
                    onChange={handleChange}
                  />
                </Grid>
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
