// TODO: type of regex;
const acceptedCreditCards: any = {
  visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
  mastercard: /^5[1-5][0-9]{14}$|^2(?:2(?:2[1-9]|[3-9][0-9])|[3-6][0-9][0-9]|7(?:[01][0-9]|20))[0-9]{12}$/,
  amex: /^3[47][0-9]{13}$/,
  discover:
    /^65[4-9][0-9]{13}|64[4-9][0-9]{13}|6011[0-9]{12}|(622(?:12[6-9]|1[3-9][0-9]|[2-8][0-9][0-9]|9[01][0-9]|92[0-5])[0-9]{10})$/,
  diners_club: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
  jcb: /^(?:2131|1800|35[0-9]{3})[0-9]{11}$/,
};

export const validateCard = (valueArg: string): boolean => {
  // remove all non digit characters
  const value = valueArg.replace(/\D/g, '');
  let sum = 0;
  let shouldDouble = false;
  // loop through values starting at the rightmost side
  for (let i = value.length - 1; i >= 0; i--) {
    let digit = parseInt(value.charAt(i));

    if (shouldDouble) {
      if ((digit *= 2) > 9) digit -= 9;
    }

    sum += digit;
    shouldDouble = !shouldDouble;
  }
  const valid = sum % 10 == 0;
  let accepted = false;

  // loop through the keys (visa, mastercard, amex, etc.)
  Object.keys(acceptedCreditCards).forEach((key: string) => {
    const regex: RegExp = acceptedCreditCards[key];
    if (regex.test(value)) {
      accepted = true;
    }
  });

  return valid && accepted;
};

export const validateCVV = (creditCardArg: string, cvvArg: string): boolean => {
  // remove all non digit characters
  const creditCard = creditCardArg.replace(/\D/g, '');
  const cvv = cvvArg.replace(/\D/g, '');
  // american express and cvv is 4 digits
  if (acceptedCreditCards.amex.test(creditCard)) {
    if (/^\d{4}$/.test(cvv)) return true;
  } else if (/^\d{3}$/.test(cvv)) {
    // other card & cvv is 3 digits
    return true;
  }
  return false;
};
