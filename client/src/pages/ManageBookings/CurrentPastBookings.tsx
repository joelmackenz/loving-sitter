import { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import useStyles from './useStyles';

export default function CurrentPastBookings(): JSX.Element {
  const classes = useStyles();

  const handleDateChange = () => {};

  return (
    <>
      <Grid>
        {/* <NextBooking />
        <CurrentPastBookings /> */}
      </Grid>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          className={classes.datePicker}
          disableToolbar
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-dialog-from"
          label="From"
          value={null}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      </MuiPickersUtilsProvider>
    </>
  );
}
