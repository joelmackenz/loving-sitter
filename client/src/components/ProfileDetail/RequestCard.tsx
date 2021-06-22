import { format } from 'date-fns';
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
            inputProps={{
              min: format(new Date(), 'yyyy-MM-dd'),
            }}
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
            inputProps={{
              min: format(new Date(), 'yyyy-MM-dd'),
            }}
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
