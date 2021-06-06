import { useState } from 'react';
import { Button, Grid, TextField, Typography } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
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
    <div className={classes.root}>
      <LandingNavbar />
      <Grid container>
        <Grid item sm={6} className={classes.mainContent}>
          <Grid className={classes.subBox}>
            <Typography variant="h2" component="h2" className={classes.mainText}>
              Find the care your dog deserves
            </Typography>
            <form>
              <Typography className={classes.searchText}>WHERE</Typography>
              <TextField variant="outlined" placeholder="Anywhere" className={classes.placeSearchInput} />
              <Typography className={classes.searchText}>DROP IN / DROP OFF</Typography>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
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
                  variant="inline"
                  inputVariant="outlined"
                  placeholder="mm/dd/yyyy"
                  format="MM/dd/yyyy"
                  value={dropOffDate}
                  onChange={handleDropOffDateChagne}
                />
              </MuiPickersUtilsProvider>
              <Grid>
                <Button variant="contained" color="secondary" className={classes.mainPageBtn}>
                  FIND MY DOG SITTER
                </Button>
              </Grid>
            </form>
          </Grid>
        </Grid>
        <Grid item sm={6}>
          <img src={mainPagePhoto} alt="mainPagePhoto" className={classes.mainPhoto} />
        </Grid>
      </Grid>
    </div>
  );
}
