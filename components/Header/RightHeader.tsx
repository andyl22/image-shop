import Link from "next/link";
import styles from "./RightHeader.module.scss";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useState } from "react";
import ModalCart from "../ModalCart/ModalCart";

export default function RightHeader() {
  const [showCartModal, setShowCartModal] = useState(false);

  const toggleModal = () => {
    setShowCartModal(!showCartModal);
  }

  return (
    <>
      <ModalCart toggleModal={toggleModal} isOpen={showCartModal} />
      <div className={styles.rightHeader}>
        <button aria-label="view cart" onClick={toggleModal}>
          <p>0</p>
          <ShoppingCartIcon fontSize="small" />
        </button>
        <nav className={styles.headerLinkContainer}>
          <Link href="/login">
            <a>Sign In</a>
          </Link>
        </nav>
      </div>
    </>
  );
}
