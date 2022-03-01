import { MouseEvent, useState, useEffect } from "react";
import styles from "./Modal.module.scss";

interface Prop {
  children: React.ReactNode;
  toggleModal: Function;
}

export default function Modal(props: Prop) {
  const { children, toggleModal } = props;
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
      className={styles.modalOverlay}
      id="modal-overlay"
      onPointerDown={closeModal}
    >
      {children}
    </div>
  );
}
