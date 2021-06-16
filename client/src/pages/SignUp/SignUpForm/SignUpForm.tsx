import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import InputLabel from '@material-ui/core/InputLabel';
import { CircularProgress } from '@material-ui/core';

import useStyles from './useStyles';
import DemoUser from '../../../components/DemoUser/DemoUser';

interface Props {
  handleSubmit: (
    {
      firstName,
      lastName,
      email,
      password,
    }: {
      email: string;
      password: string;
      firstName: string;
      lastName: string;
    },
    {
      setStatus,
      setSubmitting,
    }: FormikHelpers<{
      email: string;
      password: string;
      firstName: string;
      lastName: string;
    }>,
  ) => void;
}

const SignUpForm = ({ handleSubmit }: Props): JSX.Element => {
  const classes = useStyles();

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        firstName: '',
        lastName: '',
      }}
      validationSchema={Yup.object().shape({
        firstName: Yup.string().required('First Name is required').max(40, 'Username is too long'),
        lastName: Yup.string().required('Last Name is required').max(40, 'Username is too long'),
        email: Yup.string().required('Email is required').email('Email is not valid'),
        password: Yup.string()
          .required('Password is required')
          .max(100, 'Password is too long')
          .min(6, 'Password too short'),
      })}
      onSubmit={handleSubmit}
    >
      {({ handleSubmit, handleChange, values, touched, errors, isSubmitting }) => (
        <form onSubmit={handleSubmit} className={classes.form} noValidate>
          <InputLabel className={classes.inputLabel} htmlFor="firstName">
            First Name
          </InputLabel>
          <TextField
            id="firstName"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            name="firstName"
            autoComplete="John"
            autoFocus
            helperText={touched.firstName ? errors.firstName : ''}
            error={touched.firstName && Boolean(errors.firstName)}
            value={values.firstName}
            onChange={handleChange}
            variant="outlined"
            placeholder="Your First name"
          />
          <InputLabel className={classes.inputLabel} htmlFor="lastName">
            Last Name
          </InputLabel>
          <TextField
            id="lastName"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            name="lastName"
            autoComplete="John"
            autoFocus
            helperText={touched.lastName ? errors.lastName : ''}
            error={touched.lastName && Boolean(errors.lastName)}
            value={values.lastName}
            onChange={handleChange}
            variant="outlined"
            placeholder="Your Last name"
          />
          <InputLabel className={classes.inputLabel} htmlFor="email">
            Email
          </InputLabel>
          <TextField
            id="email"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            name="email"
            placeholder="Enter an email"
            autoComplete="email"
            helperText={touched.email ? errors.email : ''}
            error={touched.email && Boolean(errors.email)}
            value={values.email}
            variant="outlined"
            onChange={handleChange}
          />
          <InputLabel className={classes.inputLabel} htmlFor="password">
            Password
          </InputLabel>
          <TextField
            id="password"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            type="password"
            placeholder="Create a password"
            autoComplete="current-password"
            helperText={touched.password ? errors.password : ''}
            error={touched.password && Boolean(errors.password)}
            value={values.password}
            variant="outlined"
            onChange={handleChange}
          />

          <Box textAlign="center">
            <Button type="submit" size="large" variant="contained" color="primary" className={classes.submit}>
              {isSubmitting ? <CircularProgress style={{ color: 'white' }} /> : 'Sign Up'}
            </Button>
            <DemoUser submit={classes.submit} />
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default SignUpForm;
