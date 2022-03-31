import { ReactNode } from "react";
import Modal from "../Modal/Modal";
import styles from "./ActionDialog.module.scss";

interface Props {
  dialogTitle: string;
  confirmAction: Function;
  children: ReactNode | ReactNode[];
}

export default function ActionDialog(props: any) {
  const { dialogTitle, confirmAction, toggleModal, children } = props;
  return (
    <Modal toggleModal={toggleModal}>
      <div className={styles.actionDialog}>
        <h1>{dialogTitle}</h1>
        <div className={styles.dialogContent}>
        {children}
        </div>
        <div className={styles.dialogButtonsContainer}>
          <button onClick={confirmAction}>
            Confirm
          </button>
          <button onClick={toggleModal}>
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  )
}