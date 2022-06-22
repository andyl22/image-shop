/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { MouseEvent, useState, useEffect, ReactElement } from 'react';
import styles from './Modal.module.scss';

interface Prop {
  children: ReactElement;
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
    if (target.id === 'modal-overlay') {
      toggleModal();
    }
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape') toggleModal();
    };

    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyPress, {
      once: true,
    });

    return () => {
      document.body.style.overflow = 'auto';
      document.removeEventListener('keydown', handleKeyPress);
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
      onClick={closeModal}
      role="dialog"
      aria-modal="true"
    >
      {children}
    </div>
  );
}
