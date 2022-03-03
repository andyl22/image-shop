import { ReactNode } from "react";
import styles from "./DropdownContainer.module.scss";

interface Props {
  children: ReactNode | ReactNode[];
}

export default function DropdownContainer(props: Props) {
  const { children } = props;
  return <div className={styles.dropdownContainer}>{children}</div>;
}
