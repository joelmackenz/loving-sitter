import { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import useStyles from './useStyles';

export default function ManageBookings(): JSX.Element {
  const classes = useStyles();
  const [date, changeDate] = useState<Date>(new Date());

  //   const changeDate = () => {
  //     console.log('Yes');
  //   };

  return (
    <>
      <Grid>
        {/* <NextBooking />
        <CurrentPastBookings /> */}
      </Grid>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DatePicker autoOk orientation="landscape" variant="static" openTo="date" value={date} onChange={changeDate} />
      </MuiPickersUtilsProvider>
    </>
  );
}
