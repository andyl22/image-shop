import { MouseEvent, useState, useEffect } from "react";
import styles from "./Modal.module.scss";

interface Prop {
  children: React.ReactNode;
  toggleModal: Function;
  absolute?: boolean;
  allowOverlay?: boolean;
}

export default function Modal(props: Prop) {
  const { children, toggleModal, absolute, allowOverlay } = props;
  const [disabled, setDisabled] = useState(true);

  const closeModal = (e: MouseEvent) => {
    if (disabled) return;
    const target = e.target as HTMLElement;
    if (target.id === "modal-overlay") {
      toggleModal();
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  });

  useEffect(() => {
    setTimeout(() => setDisabled(false), 250);
  }, []);

  return (
    <div
      className={`${styles.modalOverlay} 
      ${absolute ? styles.absolute : styles.fixed}
      ${allowOverlay ? styles.allowOverlay : null}
      `}
      id="modal-overlay"
      onPointerDown={closeModal}
      role="dialog"
      aria-modal="true"
    >
      {children}
    </div>
  );
}
