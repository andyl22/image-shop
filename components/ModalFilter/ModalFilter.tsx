import { MouseEventHandler } from "react";
import Drawer from "../Drawer/Drawer";

interface Props {
  toggleModal: MouseEventHandler;
  isOpen: boolean;
}

export default function ModalFilter(props: Props) {
  const { toggleModal, isOpen } = props;

  return (
    <Drawer toggleModal={toggleModal} isOpen={isOpen} headerName="Filter Items" >
      <p>Test</p>
    </Drawer>
  )
}