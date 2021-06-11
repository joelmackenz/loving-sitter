import { useState } from 'react';
import clsx from 'clsx';
import { Button, Grid, TextField, Typography } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import Box from '@material-ui/core/Box';

import mainPagePhoto from '../../Images/mainPagePhoto.jpg';
import useStyles from './useStyles';
import LandingNavbar from '../../components/LandingNavbar/LandingNavbar';

export default function Main(): JSX.Element {
  const [dropInDate, setDropInDate] = useState<Date | null>(null);
  const [dropOffDate, setDropOffDate] = useState<Date | null>(null);
  const classes = useStyles();

  const handleDropInDateChange = (date: Date | null) => {
    setDropInDate(date);
  };

  const handleDropOffDateChagne = (date: Date | null) => {
    setDropOffDate(date);
  };

  return (
    <>
      <LandingNavbar />
      <div className={classes.root}>
        <Grid container>
          <Grid item sm={6} xs={12} className={classes.mainContent}>
            <Grid className={classes.subBox}>
              <Typography variant="h2" component="h1" className={classes.mainText}>
                Find the care your
                <Box display="block" component="span">
                  dog deserves
                </Box>
              </Typography>
              <form>
                <InputLabel htmlFor="search" className={classes.searchText}>
                  WHERE
                </InputLabel>
                <TextField
                  id="search"
                  name="search"
                  variant="outlined"
                  placeholder="Anywhere"
                  className={classes.searchInput}
                  fullWidth
                />
                <InputLabel htmlFor="dropIn" className={clsx(classes.searchText, classes.inlineDisplay)}>
                  DROP IN /
                </InputLabel>
                <InputLabel htmlFor="dropOff" className={clsx(classes.searchText, classes.inlineDisplay)}>
                  &nbsp;DROP OFF
                </InputLabel>
                <Box className={classes.dateRangeContainer}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      id="dropIn"
                      name="dropIn"
                      className={classes.dateRange}
                      variant="inline"
                      inputVariant="outlined"
                      placeholder="mm/dd/yyyy"
                      format="MM/dd/yyyy"
                      value={dropInDate}
                      onChange={handleDropInDateChange}
                    />
                  </MuiPickersUtilsProvider>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      id="dropOff"
                      name="dropOff"
                      className={classes.dateRange}
                      variant="inline"
                      inputVariant="outlined"
                      placeholder="mm/dd/yyyy"
                      format="MM/dd/yyyy"
                      value={dropOffDate}
                      onChange={handleDropOffDateChagne}
                    />
                  </MuiPickersUtilsProvider>
                </Box>
                <Grid>
                  <Button variant="contained" color="primary" className={classes.mainPageBtn}>
                    FIND MY DOG SITTER
                  </Button>
                </Grid>
              </form>
            </Grid>
          </Grid>
          <Grid item sm={6} xs={12}>
            <img src={mainPagePhoto} alt="mainPagePhoto" className={classes.mainPhoto} />
          </Grid>
        </Grid>
      </div>
    </>
  );
}
