import { useState } from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import { Rating } from '@material-ui/lab';

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
    <>
      <Box textAlign="center">
        <Typography variant="h4">{`${profile.priceRate}/hr`}</Typography>
        <Rating value={4.2} />
      </Box>
      <Grid container>
        <Grid item xs={12}>
          <InputLabel htmlFor="dropIn" className={classes.inputLabel}>
            Drop In
          </InputLabel>
        </Grid>
        <Grid item sm={12} xs={12} className={classes.inputFieldsContainer}>
          <TextField
            type="date"
            id="dropIn"
            name="dropIn"
            variant="outlined"
            // sadas
          />
          <TextField
            type="time"
            id="dropInTime"
            name="dropInTime"
            variant="outlined"
            // sadas
          />
        </Grid>
        <Grid item xs={12}>
          <InputLabel htmlFor="dropOff" className={classes.inputLabel}>
            Drop Off
          </InputLabel>
        </Grid>
        <Grid item sm={12} xs={12} className={classes.inputFieldsContainer}>
          <TextField
            type="date"
            id="dropOff"
            name="dropOff"
            variant="outlined"
            // sadas
          />
          <TextField
            type="time"
            id="dropOffTime"
            name="dropOffTime"
            variant="outlined"
            // sadas
          />
        </Grid>
      </Grid>
      <Box textAlign="center" className={classes.buttonContainer}>
        <Button type="submit" size="large" variant="contained" color="primary">
          Send Request
        </Button>
        <Button type="button" size="large" variant="contained" color="primary">
          Send Message
        </Button>
      </Box>
    </>
  );
}
