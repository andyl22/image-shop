import { ReactNode } from "react";
import styles from "./Sheet.module.scss";

interface Props {
  background: string;
  children: ReactNode | Array<ReactNode>;
  border?: boolean;
  allowHover?: boolean;
  height?: string;
  width?: string;
}

export default function Sheet(props: Props) {
  const { background, border, children, allowHover, height, width } = props;

  const optionalStyles = {
    background: `${background}`,
    backgroundSize: "cover",
    backgroundPosition: "center center",
    borderRadius: `${border ? "1rem" : 0}`,
    height: `${height}`,
    width: `${width}`,
  };

  return (
    <div
      style={optionalStyles}
      className={`${styles.sheetContainer} 
        ${allowHover ? styles.sheetHover : null}`}
    >
      {children}
    </div>
  );
}
