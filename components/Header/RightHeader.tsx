import Link from "next/link";
import CartIcon from "../CartIcon/CartIcon";
import styles from "./RightHeader.module.scss";

export default function RightHeader() {
  return (
    <div className={styles.rightHeader}>
      <CartIcon />
      <nav className={styles.headerLinkContainer}>
        <Link href="/login">
          <a>Sign In</a>
        </Link>
      </nav>
    </div>
  );
}
