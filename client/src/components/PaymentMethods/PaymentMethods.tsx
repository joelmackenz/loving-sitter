import React, { useState, useCallback } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import CircleCheckedFilled from '@material-ui/icons/CheckCircle';
import CircleUnchecked from '@material-ui/icons/RadioButtonUnchecked';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { Formik } from 'formik';
import Fade from '@material-ui/core/Fade';
// import * as Yup from 'yup';

import { validateCVV, validateCard } from './utils';
import useStyles from './useStyles';

interface FormValues {
  cardNumber: string;
  expires: string;
  cvv: string;
}

interface CardState extends FormValues {
  id?: number;
}

const Payment = (): JSX.Element => {
  const theme = useTheme();
  const isLessthanSm: boolean = useMediaQuery(theme.breakpoints.down('sm'));
  const classes = useStyles({ isLessthanSm })();
  const [cards, setCards] = useState<CardState[]>([
    { id: 1, cardNumber: '1212 1212 1212 1212', expires: '06/24', cvv: '123' },
    { id: 2, cardNumber: '1222 1213 1212 4212', expires: '07/24', cvv: '133' },
  ]);
  const [selectedValue, setSelectedValue] = useState('card-0');
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [maxLength, setMaxLength] = useState({
    cardNumber: 16,
  });
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const handleModelOpening = () => setIsModelOpen(true);
  const handleModelClosing = () => setIsModelOpen(false);
  const handleRadioButtonChange = (event: React.ChangeEvent<HTMLInputElement>) => setSelectedValue(event.target.value);
  const handleSubmit = () => {
    return;
  };

  const validateForm = (values: FormValues) => {
    const errors: { cardNumber?: string; expires?: string; cvv?: string } = {};
    if (values.cardNumber) {
      const result = validateCard(values.cardNumber);
      if (!result) {
        errors.cardNumber = 'Please, enter correct card number.';
      } else {
        setIsButtonDisabled(false);
      }
    }
    if (values.cvv) {
      const result = validateCVV(values.cardNumber, values.cvv);
      if (!result) {
        errors.cvv = 'Please, enter correct CVV';
      } else {
        setIsButtonDisabled(false);
      }
    }
    return errors;
  };

  const formatCardNumber = useCallback((valueArg: string): string => {
    // remove all non digit characters
    const value = valueArg.replace(/\D/g, '');
    let formattedValue;
    // american express, 15 digits
    if (/^3[47]\d{0,13}$/.test(value)) {
      formattedValue = value.replace(/(\d{4})/, '$1 ').replace(/(\d{4}) (\d{6})/, '$1 $2 ');
      setMaxLength((prevState) => ({ ...prevState, cardNumber: 17 }));
    } else if (/^3(?:0[0-5]|[68]\d)\d{0,11}$/.test(value)) {
      // diner's club, 14 digits
      formattedValue = value.replace(/(\d{4})/, '$1 ').replace(/(\d{4}) (\d{6})/, '$1 $2 ');
      setMaxLength((prevState) => ({ ...prevState, cardNumber: 16 }));
    } else if (/^\d{0,16}$/.test(value)) {
      // regular cc number, 16 digits
      formattedValue = value.match(/.{1,4}/g)?.join(' ');
      setMaxLength((prevState) => ({ ...prevState, cardNumber: 19 }));
    }
    return formattedValue || '';
  }, []);

  return (
    <>
      <CardHeader title="Payment Methods" component="h2" className={classes.cardHeader} />
      <CardContent className={classes.cardContent}>
        {cards.length ? (
          <>
            <Typography color="textSecondary" className={classes.marginLeft} align={isLessthanSm ? 'center' : 'left'}>
              Saved Payment Profiles:
            </Typography>
            <Grid container spacing={2} className={classes.cardsContainer}>
              {cards.map((card, idx) => (
                <Grid item xs={12} md={6} key={card.id}>
                  <Card elevation={1}>
                    <CardHeader
                      avatar={<Avatar aria-label="recipe">R</Avatar>}
                      action={
                        <Radio
                          icon={<CircleUnchecked />}
                          checkedIcon={<CircleCheckedFilled />}
                          checked={selectedValue === `card-${idx}`}
                          value={`card-${idx}`}
                          name="card-radio-button"
                          onChange={handleRadioButtonChange}
                        />
                      }
                    />
                    <CardContent>
                      <Typography variant="h6" component="h4">
                        {card.cardNumber.replace(/\d{4}(?= \d{4})/g, '****')}
                      </Typography>
                      <Typography color="textSecondary">{`Exp: Date `}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </>
        ) : (
          <Typography align="center" color="textSecondary" className={classes.noCardsMessage}>
            You don&apos;t have any payment method saved.
            <Box component="span" display="block">
              Click on Add new payment profile to add one.
            </Box>
          </Typography>
        )}
        <Button variant="outlined" color="primary" className={classes.newPayment} onClick={handleModelOpening}>
          Add a new payment Profile
        </Button>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={isModelOpen}
          onClose={handleModelClosing}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={isModelOpen}>
            <div>
              <Formik
                initialValues={{
                  cardNumber: '',
                  expires: '',
                  cvv: '',
                }}
                validate={validateForm}
                onSubmit={handleSubmit}
              >
                {({ handleSubmit, handleChange, values, touched, errors, isSubmitting }) => {
                  return (
                    <form onSubmit={handleSubmit} className={classes.form}>
                      <Typography paragraph variant="h5" component="h2" align="center">
                        Enter your Card Details:
                      </Typography>
                      <Grid container>
                        <Grid item md={3} xs={12} className={classes.inputLabelGridContainer}>
                          <InputLabel htmlFor="cardNumber">Card Number</InputLabel>
                        </Grid>
                        <Grid item md={7} xs={12}>
                          <TextField
                            id="cardNumber"
                            fullWidth
                            margin="normal"
                            name="cardNumber"
                            autoComplete="cardNumber"
                            inputProps={{
                              maxLength: maxLength.cardNumber,
                            }}
                            FormHelperTextProps={{
                              className: classes.helperText,
                            }}
                            autoFocus
                            variant="outlined"
                            placeholder="XXXX XXXX XXXX XXXX"
                            helperText={errors.cardNumber ? errors.cardNumber : ''}
                            error={touched.cardNumber && Boolean(errors.cardNumber)}
                            value={values.cardNumber}
                            onChange={(event) => {
                              event.target.value = formatCardNumber(event.target.value);
                              return handleChange(event);
                            }}
                          />
                        </Grid>
                        <Grid item md={3} xs={12} className={classes.inputLabelGridContainer}>
                          <InputLabel htmlFor="expires">Expires At</InputLabel>
                        </Grid>
                        <Grid item md={7} xs={12}>
                          <TextField
                            type="month"
                            id="expires"
                            fullWidth
                            margin="normal"
                            name="expires"
                            autoComplete="expires"
                            autoFocus
                            variant="outlined"
                            placeholder="MM/YY"
                            helperText={touched.expires ? errors.expires : ''}
                            error={touched.expires && Boolean(errors.expires)}
                            value={values.expires}
                            onChange={handleChange}
                          />
                        </Grid>
                        <Grid item md={3} xs={12} className={classes.inputLabelGridContainer}>
                          <InputLabel htmlFor="cvv">CVV</InputLabel>
                        </Grid>
                        <Grid item md={7} xs={12}>
                          <TextField
                            type="password"
                            id="cvv"
                            fullWidth
                            margin="normal"
                            name="cvv"
                            autoComplete="cvv"
                            autoFocus
                            variant="outlined"
                            placeholder="***"
                            helperText={errors.cvv ? errors.cvv : ''}
                            error={touched.cvv && Boolean(errors.cvv)}
                            value={values.cvv}
                            onChange={handleChange}
                          />
                        </Grid>
                      </Grid>
                      <Box textAlign="center" marginTop="1.2rem" className={classes.buttonContainer}>
                        <Button
                          type="submit"
                          size="large"
                          variant="contained"
                          color="primary"
                          disabled={isButtonDisabled}
                        >
                          {isSubmitting ? <CircularProgress style={{ color: 'white' }} /> : 'Save'}
                        </Button>
                        <Button type="button" size="large" variant="contained" onClick={() => setIsModelOpen(false)}>
                          Cancel
                        </Button>
                      </Box>
                    </form>
                  );
                }}
              </Formik>
            </div>
          </Fade>
        </Modal>
      </CardContent>
    </>
  );
};

export default Payment;
