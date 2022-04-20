import type { NextPage } from "next";
import Head from "next/head";
import CartItem from "../../../components/CartItem/CartItem";
import CollapsibleItem from "../../../components/CollapsibleItem/CollapsibleItem";
import StripePayment from "../../../components/Stripe/StripePayment";
import { useAppSelector } from "../../../redux/hooks";
import { selectCart } from "../../../redux/slices/cartSlice";
import styles from "../../../styles/Checkout.module.scss";

const Checkout: NextPage = () => {
  const cart = useAppSelector(selectCart);

  const cartItemKeys = Object.keys(cart.items);
  const mappedCartItems = cartItemKeys.map((key) => {
    const cartItemDetails = cart.items[key];
    return (
      <li key={key}>
        <CartItem id={key} cartItemDetails={cartItemDetails} />
      </li>
    );
  });

  return (
    <>
      <Head>
        <title>Shop</title>
        <meta name="description" content="Buy Pictures of Parks" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.checkoutContent}>
          <div className={styles.sectionWrapper}>
            <CollapsibleItem
              parentNode={
                <span className={styles.sectionTitle}>Shipping Information</span>
              }
            >
              <div className={styles.checkoutForm}>
                <StripePayment />
              </div>
            </CollapsibleItem>
          </div>
          <div className={styles.sectionWrapper}>
            <CollapsibleItem
              parentNode={
                <span className={styles.sectionTitle}>Payment Info</span>
              }
            >
              <div className={styles.checkoutForm}>
                <StripePayment />
              </div>
            </CollapsibleItem>
          </div>
          <div className={styles.sectionWrapper}>
            <CollapsibleItem
              parentNode={
                <span className={styles.sectionTitle}>Cart Summary</span>
              }
              showCollapsedOnLoad={true}
            >
              <ul>{mappedCartItems}</ul>
            </CollapsibleItem>
          </div>
        </div>
      </main>
    </>
  );
};

export default Checkout;
