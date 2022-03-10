import { MouseEventHandler } from "react";
import Drawer from "../Drawer/Drawer";
import styles from "./ModalCart.module.scss";

interface Props {
  toggleModal: MouseEventHandler;
  isOpen: boolean;
}

export default function ModalCart(props: Props) {
  const { toggleModal, isOpen } = props;

  if (!isOpen) return null;
  return (
    <Drawer toggleModal={toggleModal} isOpen={isOpen} headerName="Cart">
      <div className={styles.cartContentContainer}>
        <div className={styles.cartMain}>
          <ul>
            <li>
              <p>Test</p>
            </li>
            <li>
              <p>Test</p>
            </li>
            <li>
              <p>Test</p>
            </li>
            <li>
              <p>Test</p>
            </li>
            <li>
              <p>Test</p>
            </li>
          </ul>
        </div>
        <div className={styles.cartSummary}>
          <p>Total: $58</p>
          <button>Checkout</button>
        </div>
      </div>
    </Drawer>
  );
}
