import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import Typography from '@material-ui/core/Typography';
import useStyles from './useStyles';
import { CircularProgress } from '@material-ui/core';

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

  const generateDemoUser = (values: any) => {
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    values.username = `testing${randomNum}`;
    values.email = `testing${randomNum}@test.com`;
    values.password = 'testing';
  };

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
          <Typography className={classes.label}>First name</Typography>
          <TextField
            id="firstName"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              classes: { input: classes.inputs },
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
          <Typography className={classes.label}>Last name</Typography>
          <TextField
            id="lastName"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              classes: { input: classes.inputs },
            }}
            name="lastName"
            autoComplete="Doe"
            autoFocus
            helperText={touched.lastName ? errors.lastName : ''}
            error={touched.lastName && Boolean(errors.lastName)}
            value={values.lastName}
            onChange={handleChange}
            variant="outlined"
            placeholder="Your Last name"
          />
          <Typography className={classes.label}>Email address</Typography>
          <TextField
            id="email"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              classes: { input: classes.inputs },
            }}
            name="email"
            autoComplete="email"
            helperText={touched.email ? errors.email : ''}
            error={touched.email && Boolean(errors.email)}
            value={values.email}
            onChange={handleChange}
            variant="outlined"
            placeholder="Your email"
          />
          <Typography className={classes.label}>Password</Typography>
          <TextField
            id="password"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              classes: { input: classes.inputs },
            }}
            type="password"
            autoComplete="current-password"
            helperText={touched.password ? errors.password : ''}
            error={touched.password && Boolean(errors.password)}
            value={values.password}
            onChange={handleChange}
            variant="outlined"
            placeholder="Create a password"
          />
          <Box textAlign="center">
            <Button type="submit" size="large" variant="contained" color="secondary" className={classes.submit}>
              {isSubmitting ? <CircularProgress style={{ color: 'white' }} /> : 'SIGN UP'}
            </Button>
            <Button
              type="submit"
              size="large"
              variant="contained"
              color="secondary"
              className={classes.submit}
              onClick={() => generateDemoUser(values)}
            >
              {isSubmitting ? <CircularProgress style={{ color: 'white' }} /> : 'DEMO USER'}
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default SignUpForm;
