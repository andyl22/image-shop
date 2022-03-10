import Modal from "../Modal/Modal";
import styles from "./Drawer.module.scss";
import CloseIcon from "@mui/icons-material/Close";
import { MouseEventHandler, ReactNode } from "react";

interface Props {
  toggleModal: MouseEventHandler;
  isOpen: boolean;
  children: ReactNode | Array<ReactNode>;
  headerName: string;
}

export default function Drawer(props: Props) {
  const { toggleModal, isOpen, headerName, children } = props;

  if (!isOpen) return null;
  return (
    <Modal toggleModal={toggleModal}>
      <div className={styles.drawer}>
        <div className={styles.drawerHeader}>
          <h1>{headerName}</h1>
          <button aria-label="close modal" className={styles.closeButton} onClick={toggleModal}>
            <CloseIcon />
          </button>
        </div>
        {children}
      </div>
    </Modal>
  );
}
