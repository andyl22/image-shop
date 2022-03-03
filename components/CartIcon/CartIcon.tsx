import { useState } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import styles from "./CartIcon.module.scss";
import ModalCart from "../ModalCart/ModalCart";

export default function CartIcon() {
  const [showCartModal, setShowCartModal] = useState(false);

  const toggleModal = () => {
    setShowCartModal(!showCartModal);
  };
  return (
    <>
      <ModalCart toggleModal={toggleModal} isOpen={showCartModal} />
      <button aria-label="view cart" onClick={toggleModal}>
        <p>0</p>
        <ShoppingCartIcon fontSize="small" />
      </button>
    </>
  );
}
