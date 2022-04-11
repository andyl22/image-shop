import type { NextPage } from "next";
import Head from "next/head";
import Header from "../../components/Header/Header";
import styles from "../../styles/Checkout.module.scss";
import { postHTTP } from "../../utilities/fetchAPIs";
import AdyenCheckout from '@adyen/adyen-web';
import '@adyen/adyen-web/dist/adyen.css';
import { useRef } from "react";


const Checkout: NextPage = () => {
  const dropInRef = useRef(null);

  const configuration = {
    environment: 'test', // Change to 'live' for the live environment.
    clientKey: 'test_870be2...', // Public key used for client-side authentication: https://docs.adyen.com/development-resources/client-side-authentication
    session: {
      id: 'CSD9CAC3...', // Unique identifier for the payment session.
      sessionData: 'Ab02b4c...' // The payment session data.
    },
    onPaymentCompleted: (result: any, component: any) => {
        console.info(result, component);
    },
    onError: (error: { name: any; message: any; stack: any; }, component: any) => {
        console.error(error.name, error.message, error.stack, component);
    },
    // Any payment method specific configuration. Find the configuration specific to each payment method:  https://docs.adyen.com/payment-methods
    // For example, this is 3D Secure configuration for cards:
    paymentMethodsConfiguration: {
      card: {
        hasHolderName: true,
        holderNameRequired: true,
        billingAddressRequired: true
      }
    }
  };

  const handleCheckout = () => {
    // postHTTP('/shop/checkout').then(res => console.log(res));

    // Create an instance of AdyenCheckout using the configuration object.
    const createDropIn = async () => {
      console.log("test")
      const checkout = await AdyenCheckout(configuration);
      // Create an instance of Drop-in and mount it to the container you created.
      const dropinComponent = checkout.create('dropin').mount('#dropin-container');
    }

    createDropIn();
  }

  return (
    <>
      <Head>
        <title>Shop</title>
        <meta name="description" content="Buy Pictures of Parks" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className={styles.main}>
        <button onClick={handleCheckout}>Checkout</button>
        <div id="dropin-container" ref={dropInRef}>
        </div>
      </main>
    </>
  );
};

export default Checkout;

