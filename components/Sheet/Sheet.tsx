import { ReactNode } from "react";
import styles from "./Sheet.module.scss";

interface Props {
  background: string;
  children: ReactNode | Array<ReactNode>;
  border?: boolean;
}

export default function Sheet(props: Props) {
  const { background, border, children } = props;

  const optionalStyles = {
    background: `${background}`,
    backgroundSize: "cover",
    backgroundPosition: "center center",
    borderRadius: `${border ? "1rem" : 0}`,
  };

  return (
    <div className={styles.sheetContainer} style={optionalStyles}>
      {children}
    </div>
  );
}
