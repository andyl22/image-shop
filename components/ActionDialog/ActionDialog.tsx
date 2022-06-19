import { MouseEventHandler, ReactNode } from 'react';
import Modal from '../Modal/Modal';
import styles from './ActionDialog.module.scss';

interface Props {
  dialogTitle: string;
  confirmAction: MouseEventHandler<HTMLButtonElement>;
  children: ReactNode | ReactNode[];
  toggleModal: MouseEventHandler<HTMLButtonElement>;
}

export default function ActionDialog(props: Props) {
  const { dialogTitle, confirmAction, toggleModal, children } = props;

  return (
    <Modal toggleModal={toggleModal}>
      <div className={styles.actionDialog}>
        <h1>{dialogTitle}</h1>
        <div className={styles.dialogContent}>{children}</div>
        <div className={styles.dialogButtonsContainer}>
          <button onClick={confirmAction} type="submit">
            Confirm
          </button>
          <button onClick={toggleModal} type="button">
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
}
