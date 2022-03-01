import Link from "next/link";
import { ReactNode } from "react";
import styles from "./SheetLink.module.scss";

interface Props {
  background: string;
  children: ReactNode | Array<ReactNode>;
  border?: boolean;
  href: string;
}

export default function SheetLink(props: Props) {
  const { background, border, children, href } = props;

  const optionalStyles = {
    background: `${background}`,
    backgroundSize: "cover",
    backgroundPosition: "center center",
    borderRadius: `${border ? "1rem" : 0}`,
  };

  return (
    <div className={styles.sheetContainer} style={optionalStyles} tabIndex={0}>
      <Link href={href}>
        <a>{children}</a>
      </Link>
    </div>
  );
}
