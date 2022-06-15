import React, { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import RefreshIcon from '@mui/icons-material/Refresh';
import styles from './CheckoutForm.module.scss';

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | undefined>();

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(
      window.location.search,
    ).get('payment_intent_client_secret');

    if (!clientSecret) {
      return;
    }

    stripe
      .retrievePaymentIntent(clientSecret)
      .then(({ paymentIntent }) => {
        if (paymentIntent) {
          switch (paymentIntent.status) {
            case 'succeeded':
              router.push('/shop/checkout/success');
              break;
            case 'processing':
              setMessage('Your payment is processing.');
              break;
            case 'requires_payment_method':
              setMessage(
                'Your payment was not successful, please try again.',
              );
              break;
            default:
              setMessage('Something went wrong.');
              break;
          }
        }
      });
  }, [router, stripe]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // disable button until stripe and elements have loaded
    if (!stripe || !elements) return;

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url:
          process.env.NODE_ENV === 'development'
            ? 'http://localhost:3000/shop/checkout'
            : 'https://parks-shop.herokuapp.com/shop/checkout',
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (
      error.type === 'card_error' ||
      error.type === 'validation_error'
    ) {
      setMessage(error.message);
    } else {
      setMessage('An unexpected error occured.');
    }

    setIsLoading(false);
  };

  return (
    <form
      id="payment-form"
      onSubmit={handleSubmit}
      className={styles.paymentForm}
    >
      <PaymentElement id="payment-element" />
      <button
        disabled={isLoading || !stripe || !elements}
        id="submit"
      >
        <span id="button-text">
          {isLoading ? <RefreshIcon /> : 'Pay now'}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && (
        <div id="payment-message" className={styles.paymentMessage}>
          {message}
        </div>
      )}
    </form>
  );
}
