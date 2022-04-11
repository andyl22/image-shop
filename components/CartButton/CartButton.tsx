import { useState } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import styles from "./CartButton.module.scss";
import { useAppSelector } from "../../redux/hooks";
import { selectCart } from "../../redux/slices/cartSlice";
import ModalCart from "../ModalCart/ModalCart";

export default function CartButton() {
  const cart = useAppSelector(selectCart);
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
        <p>
          {Object.keys(cart.items).reduce(
            (count, key) => (count += cart.items[key].quantity),
            0
          )}
        </p>
        <ShoppingCartIcon fontSize="small" />
      </button>
    </>
  );
}
