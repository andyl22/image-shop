import styles from "./LeftNavMenu.module.scss";
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import Modal from "../Modal/Modal";
import { MouseEventHandler } from "react";
import CollapsibleItem from "../CollapsibleItem/CollapsibleItem";

interface Props {
  toggleModal: MouseEventHandler;
}

export default function LeftNavMenu(props: Props) {
  const { toggleModal } = props;
  return (
    <Modal toggleModal={toggleModal}>
      <div className={styles.leftNavMenu}>
        <KeyboardDoubleArrowLeftIcon fontSize="medium" className={styles.backIcon} onClick={toggleModal} />
        <h1>Parks</h1>
        <CollapsibleItem parentNode={<p>Test</p>}>
          <p>Test1</p>
          <p>Test</p>
        </CollapsibleItem>
        <CollapsibleItem parentNode={<p>Test</p>}>
          <p>Test</p>
          <p>Test</p>
        </CollapsibleItem>
      </div>
    </Modal>
  )
}