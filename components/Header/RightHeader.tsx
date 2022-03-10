import Link from "next/link";
import CartButton from "../CartButton/CartButton";
import styles from "./RightHeader.module.scss";

export default function RightHeader() {
  return (
    <div className={styles.rightHeader}>
      <CartButton />
      <nav className={styles.headerLinkContainer}>
        <Link href="/login">
          <a>Sign In</a>
        </Link>
      </nav>
    </div>
  );
}
