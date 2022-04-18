import { postHTTP } from "../../utilities/fetchAPIs";
import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

// Load stripe only once, and not on rerenders
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_API);

export default function StripePayment() {
  const [clientSecret, setClientSecret] = useState();
  useEffect(() => {
    postHTTP("/shop/checkout", { amount: 300 }).then((data) =>
      setClientSecret(data.clientSecret)
    );
  }, []);

  const options = {
    clientSecret,
  };

  return (
    <>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </>
  );
}
