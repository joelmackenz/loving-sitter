import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
// import React from 'react';
import PaymentForm from './PaymentForm';

export default function StripeContainer(): JSX.Element {
  const PUBLIC_KEY =
    'pk_test_51J0HLZK9t7CHlBXWNtL9lYTvyyqa0EAyJUikKEZibnc9G5DtPTtu2VpzikfdnqDl83Zrb0SUUKpNIL35f5zL40Rs00Ve97GMDn';
  const stripePromise = loadStripe(PUBLIC_KEY);
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
  );
}
