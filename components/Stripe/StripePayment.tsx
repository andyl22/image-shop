import { postHTTP } from "../../utilities/fetchAPIs";
import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import styles from "./StripePayment.module.scss";

export default function StripePayment() {
  useEffect(() => {
    (async () => {
      const STRIPE_API_KEY = process.env.NEXT_PUBLIC_STRIPE_API;
      const stripe = await loadStripe(STRIPE_API_KEY);
      const res = await postHTTP("/shop/checkout", { amount: 300 });
      const element = stripe?.elements(res);
      const paymentElement = element?.create("payment");
      paymentElement?.mount("#mountPaymentForm");
    })();
  }, []);

  return (
    <>
      <div id="mountPaymentForm" className={styles.paymentForm} />
      <button id="submit">
        <div className="spinner hidden" id="spinner"></div>
        <span id="button-text">Pay now</span>
      </button>
      <div id="payment-message" className="hidden"></div>
    </>
  );
}
