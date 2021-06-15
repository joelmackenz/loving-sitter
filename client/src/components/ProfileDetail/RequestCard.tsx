import DateFnsUtils from '@date-io/date-fns';
import { Box, Button, CircularProgress, Grid, TextField, Typography } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import { MuiPickersUtilsProvider, KeyboardDatePicker, KeyboardTimePicker } from '@material-ui/pickers';
import { useState } from 'react';
import useStyles from './useStyles';

interface Props {
  profile: {
    priceRate: number;
  };
}
export default function RequestCard({ profile }: Props): JSX.Element {
  const classes = useStyles();
  const currentDate = new Date();
  const [startDate, setStartDate] = useState<Date | null>(currentDate);
  const [endDate, setEndDate] = useState<Date | null>(currentDate);
  const [serviceHours, setServiceHours] = useState<number>(0);
  const [sendSuccess, setSendSuccess] = useState<boolean>(false);

  const handleStartDate = (date: Date | null) => {
    if (date?.getTime() !== undefined && startDate?.getTime() !== undefined && date?.getTime() < startDate?.getTime()) {
      alert('Please select today or future day or future time');
    } else {
      setStartDate(date);
    }
  };

  const handleEndDate = (date: Date | null) => {
    if (date?.getTime() !== undefined && startDate?.getTime() !== undefined && date?.getTime() < startDate?.getTime()) {
      alert('Please select today or future day or future time');
    } else {
      setEndDate(date);
      //calculate service between start date and end date
      timeDiffCalu(date, startDate);
    }
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setSendSuccess(true);
  };

  function timeDiffCalu(serviceEndDate: Date | null, serviceStartDate: Date | null) {
    if (serviceEndDate !== null && serviceStartDate !== null) {
      const diffInMilliSeconds = Math.abs(serviceEndDate.getTime() - serviceStartDate.getTime()) / 1000;
      const hours = Math.floor(diffInMilliSeconds / 3600) % 24;
    }
  }

  return (
    <div className={classes.root}>
      <Typography variant="h4">{`${profile.priceRate}/hr`}</Typography>
      <Rating value={4.2} />
      <Box>
        <Box>
          <Typography className={classes.requestFormText}>DROP IN</Typography>
        </Box>
        <Box>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              inputVariant="outlined"
              format="dd MMMM yyyy"
              margin="normal"
              id="date-picker-inline"
              value={startDate}
              onChange={handleStartDate}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
            <KeyboardTimePicker
              margin="normal"
              id="time-picker"
              variant="inline"
              inputVariant="outlined"
              value={startDate}
              onChange={handleStartDate}
              KeyboardButtonProps={{
                'aria-label': 'change time',
              }}
            />
          </MuiPickersUtilsProvider>
        </Box>
      </Box>
      <Box>
        <Box>
          <Typography className={classes.requestFormText}>DROP OFF</Typography>
        </Box>
        <Box>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              inputVariant="outlined"
              format="dd MMMM yyyy"
              margin="normal"
              id="date-picker-inline"
              value={endDate}
              onChange={handleEndDate}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
            <KeyboardTimePicker
              margin="normal"
              id="time-picker"
              variant="inline"
              inputVariant="outlined"
              value={endDate}
              onChange={handleEndDate}
              KeyboardButtonProps={{
                'aria-label': 'change time',
              }}
            />
          </MuiPickersUtilsProvider>
        </Box>
      </Box>
      <Button color="primary" variant="contained" type="submit" size="large" onClick={(e) => handleSubmit(e)}>
        {sendSuccess ? <CircularProgress color="secondary" size={20} /> : `SEND REQUEST`}
      </Button>
    </div>
  );
}
