import Modal from "../Modal/Modal";
import styles from "./ModalCart.module.scss";
import CloseIcon from "@mui/icons-material/Close";
import { MouseEventHandler } from "react";

interface Props {
  toggleModal: MouseEventHandler;
  isOpen: boolean;
}

export default function ModalCart(props: Props) {
  const { toggleModal, isOpen } = props;

  if (!isOpen) return null;
  return (
    <Modal toggleModal={toggleModal}>
      <div className={styles.cartContainer}>
        <div className={styles.modalHeader}>
          <button aria-label="close modal" onClick={toggleModal}>
            <CloseIcon />
          </button>
          <h1>Cart</h1>
        </div>
      </div>
    </Modal>
  );
}
