import { useState } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import styles from "./CartButton.module.scss";
import ModalCart from "../ModalCart/ModalCart";

export default function CartButton() {
  const [showCartModal, setShowCartModal] = useState(false);

  const toggleModal = () => {
    setShowCartModal(!showCartModal);
  };
  return (
    <>
      <ModalCart toggleModal={toggleModal} isOpen={showCartModal} />
      <button
        aria-label="view cart modal"
        className={styles.cartButton}
        onClick={toggleModal}
      >
        <p>0</p>
        <ShoppingCartIcon fontSize="small" />
      </button>
    </>
  );
}
