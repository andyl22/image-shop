import { MouseEvent, PointerEventHandler, useEffect } from "react";
import styles from "./Modal.module.scss";

interface Prop {
  children: React.ReactNode;
  toggleModal: Function;
}

export default function Modal(props: Prop) {
  const { children, toggleModal } = props;

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    }
  })

  const closeModal = (e: MouseEvent) => {
    const target = (e.target as HTMLElement);
    if (target.id === "modal-overlay") {
      toggleModal();
    }
  }

  return (
    <div className={styles.modalOverlay} id="modal-overlay" onPointerDown={closeModal}>
      {children}
    </div>
  );
}
