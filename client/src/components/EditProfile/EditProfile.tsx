import { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Grid from '@material-ui/core/Grid';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

import useStyles from './useStyles';

const EditProfile = (): JSX.Element => {
  const classes = useStyles();
  const [isPhoneNumberAdded, setIsPhoneNumberAdded] = useState(false);
  return (
    <>
      <CardHeader title="Edit Profile" component="h2" className={classes.cardHeader} />
      <CardContent className={classes.cardContent}>
        <form>
          <Grid container>
            <Grid item md={3} className={classes.inputLabelGridContainer}>
              <InputLabel htmlFor="firstName">First Name</InputLabel>
            </Grid>
            <Grid item md={7}>
              <TextField
                id="firstName"
                fullWidth
                margin="normal"
                name="firstName"
                autoComplete="firstName"
                autoFocus
                variant="outlined"
                placeholder="John"
                // helperText={touched.email ? errors.email : ''}
                // error={touched.email && Boolean(errors.email)}
                // value={values.email}
                // onChange={handleChange}
              />
            </Grid>
            <Grid item md={3} className={classes.inputLabelGridContainer}>
              <InputLabel htmlFor="lastName">Last Name</InputLabel>
            </Grid>
            <Grid item md={7}>
              <TextField
                id="lastName"
                fullWidth
                margin="normal"
                name="lastName"
                autoComplete="lastName"
                autoFocus
                variant="outlined"
                placeholder="Doe"
                // helperText={touched.email ? errors.email : ''}
                // error={touched.email && Boolean(errors.email)}
                // value={values.email}
                // onChange={handleChange}
              />
            </Grid>
            <Grid item md={3} className={classes.inputLabelGridContainer}>
              <InputLabel htmlFor="email">Email Address</InputLabel>
            </Grid>
            <Grid item md={7}>
              <TextField
                type="email"
                id="email"
                fullWidth
                margin="normal"
                name="email"
                autoComplete="email"
                autoFocus
                variant="outlined"
                placeholder="johndoe@gmail.com"
                // helperText={touched.email ? errors.email : ''}
                // error={touched.email && Boolean(errors.email)}
                // value={values.email}
                // onChange={handleChange}
              />
            </Grid>
            <Grid item md={3} className={classes.inputLabelGridContainer}>
              <InputLabel htmlFor="phone">Phone Number</InputLabel>
            </Grid>
            <Grid item md={7}>
              {isPhoneNumberAdded ? (
                <TextField
                  type="tel"
                  id="phone"
                  fullWidth
                  margin="normal"
                  name="phone"
                  autoComplete="phone"
                  autoFocus
                  variant="outlined"
                  placeholder="Phone Number 647-777-702"
                  // helperText={touched.email ? errors.email : ''}
                  // error={touched.email && Boolean(errors.email)}
                  // value={values.email}
                  // onChange={handleChange}
                />
              ) : (
                <Box marginTop={2} marginBottom={1} display="flex" justifyContent="space-between" alignItems="center">
                  <span className={classes.phoneSpan}>No phone number is added</span>
                  <Button type="button" variant="outlined" color="primary" onClick={() => setIsPhoneNumberAdded(true)}>
                    Add a phone number
                  </Button>
                </Box>
              )}
            </Grid>
            <Grid item md={3} className={classes.inputLabelGridContainer}>
              <InputLabel htmlFor="whereYouLive">Where You Live</InputLabel>
            </Grid>
            <Grid item md={7}>
              <TextField
                id="whereYouLive"
                fullWidth
                margin="normal"
                name="whereYouLive"
                autoComplete="whereYouLive"
                autoFocus
                variant="outlined"
                placeholder="Address"
                // helperText={touched.email ? errors.email : ''}
                // error={touched.email && Boolean(errors.email)}
                // value={values.email}
                // onChange={handleChange}
              />
            </Grid>
            <Grid item md={3} className={`${classes.inputLabelGridContainer} ${classes.inputLabelMargin}`}>
              <InputLabel htmlFor="describeYourself">Describe Yourself</InputLabel>
            </Grid>
            <Grid item md={7}>
              <TextField
                id="describeYourself"
                fullWidth
                margin="normal"
                name="describeYourself"
                autoComplete="describeYourself"
                autoFocus
                variant="outlined"
                placeholder="About you"
                multiline
                rows={6}
                // helperText={touched.email ? errors.email : ''}
                // error={touched.email && Boolean(errors.email)}
                // value={values.email}
                // onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Box textAlign="center">
            <Button type="submit" size="large" variant="contained" color="primary" className={classes.submit}>
              Save
            </Button>
          </Box>
        </form>
      </CardContent>
    </>
  );
};

export default EditProfile;
