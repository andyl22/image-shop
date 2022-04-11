import { MouseEventHandler } from "react";
import Drawer from "../Drawer/Drawer";
import Link from "next/link";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { selectCart } from "../../redux/slices/cartSlice";
import styles from "./ModalCart.module.scss";
import ModalCartItem from "./ModalCartItem";

interface Props {
  toggleModal: MouseEventHandler;
  isOpen: boolean;
}

export default function ModalCart(props: Props) {
  const cart = useAppSelector(selectCart);
  const dispatch = useAppDispatch();
  const { toggleModal, isOpen } = props;

  const cartItemKeys = Object.keys(cart.items);
  const mappedCartItems = cartItemKeys.map((key) => {
    const cartItemDetails = cart.items[key];
    console.log(cartItemDetails, typeof cartItemDetails);
    return (
      <li key={key}>
        <ModalCartItem cartItemDetails={cartItemDetails} />
      </li>
    );
  });

  if (!isOpen) return null;
  return (
    <Drawer toggleModal={toggleModal} isOpen={isOpen} headerName="Cart">
      <div className={styles.cartContentContainer}>
        <div className={styles.cartMain}>
          <ul>{mappedCartItems}</ul>
        </div>
        <div className={styles.cartSummary}>
          <p>Total: $58</p>
          <Link href="/shop/checkout">
            <a className={styles.checkoutButton} onClick={toggleModal}>
              Checkout
            </a>
          </Link>
        </div>
      </div>
    </Drawer>
  );
}
