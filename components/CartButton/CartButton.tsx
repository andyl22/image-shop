import { useEffect, useState } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import styles from "./CartButton.module.scss";
import { useAppSelector } from "../../redux/hooks";
import { selectCart } from "../../redux/slices/cartSlice";
import ModalCart from "../ModalCart/ModalCart";

export default function CartButton() {
  const cart = useAppSelector(selectCart);
  const [showCartModal, setShowCartModal] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const toggleModal = () => {
    setShowCartModal(!showCartModal);
  };

  useEffect(() => {
    setCartCount(
      Object.keys(cart.items).reduce(
        (count, key) => (count += cart.items[key].quantity),
        0
      )
    )
  }, [cart])

  return (
    <>
      <ModalCart toggleModal={toggleModal} isOpen={showCartModal} />
      <button
        aria-label="view cart modal"
        className={styles.cartButton}
        onClick={toggleModal}
      >
        <p>
          {cartCount}
        </p>
        <ShoppingCartIcon fontSize="small" />
      </button>
    </>
  );
}
