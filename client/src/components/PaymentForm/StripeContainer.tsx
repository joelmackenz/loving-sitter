import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './paymentForm'

const PUBLIC_KEY =
  'pk_test_51J0HLZK9t7CHlBXWNtL9lYTvyyqa0EAyJUikKEZibnc9G5DtPTtu2VpzikfdnqDl83Zrb0SUUKpNIL35f5zL40Rs00Ve97GMDn';
const stripePromise = loadStripe(PUBLIC_KEY);

export default function StripeContainer(): JSX.Element {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
  );
}
