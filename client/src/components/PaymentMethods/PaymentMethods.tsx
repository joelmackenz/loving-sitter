import React, { useState } from 'react';
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
import { Formik, FormikHelpers } from 'formik';
import Fade from '@material-ui/core/Fade';
import PaymentIcon from 'react-payment-icons';

import { validateCVV, validateCard, acceptedCreditCards } from './utils';
import useStyles from './useStyles';

interface FormValues {
  cardNumber: string;
  expires: string;
  cvv: string;
}

interface CardState extends FormValues {
  id?: number;
  cardName: string;
}

const Payment = (): JSX.Element => {
  const theme = useTheme();
  const isLessthanSm: boolean = useMediaQuery(theme.breakpoints.down('sm'));
  const classes = useStyles({ isLessthanSm })();
  const [cards, setCards] = useState<CardState[]>([]);
  const [selectedValue, setSelectedValue] = useState('card-0');
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [maxLength, setMaxLength] = useState({
    cardNumber: 16,
  });
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const handleModelOpening = () => setIsModelOpen(true);
  const handleModelClosing = () => setIsModelOpen(false);
  const handleRadioButtonChange = (event: React.ChangeEvent<HTMLInputElement>) => setSelectedValue(event.target.value);
  const handleSubmit = (values: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
    const { cardNumber, expires: expiresAt, cvv } = values;
    let cardName: string;
    // loop through the keys (visa, mastercard, amex, etc.)
    Object.keys(acceptedCreditCards).forEach((key: string) => {
      const regex: RegExp = acceptedCreditCards[key];
      if (regex.test(cardNumber.replace(/\D/g, ''))) {
        cardName = key;
      }
    });
    const expiresProperty = expiresAt.split('-');
    let expires: string;
    if (expiresProperty.length === 2) {
      // To get the last two values of year in Chrome case
      expires = `${expiresProperty[1]}/${expiresProperty[0].substring(
        expiresProperty[0].length - 2,
        expiresProperty[0].length,
      )}`;
    } else {
      expires = expiresAt;
    }
    setCards((prevState) => [...prevState, { expires, cardNumber, cardName, cvv }]);
    setSubmitting(false);
    setIsModelOpen(false);
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

  const formatCardNumber = (valueArg: string): string => {
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
  };

  return (
    <>
      <CardHeader title="Payment Methods" component="h1" className={classes.cardHeader} />
      <CardContent className={classes.cardContent}>
        {cards.length ? (
          <>
            <Typography color="textSecondary" className={classes.marginLeft} align={isLessthanSm ? 'center' : 'left'}>
              Saved Payment Profiles:
            </Typography>
            <Grid container spacing={2} className={classes.cardsContainer}>
              {cards.map((card, idx) => (
                <Grid item xs={12} md={6} key={idx}>
                  <Card elevation={1}>
                    <CardHeader
                      avatar={
                        <PaymentIcon id={card.cardName} style={{ margin: 10, width: 100 }} className="payment-icon" />
                      }
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
                      <Typography variant="h6" component="h2">
                        {card.cardNumber.replace(/\d{4}(?= \d{4})/g, '****')}
                      </Typography>
                      <Typography color="textSecondary">{`Exp. Date ${card.expires}`}</Typography>
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
