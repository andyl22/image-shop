import Link from "next/link";
import styles from "./LeftHeader.module.scss";
import ShopDropdown from "./ShopDropdown";

export default function LeftHeader() {
  return (
    <nav className={styles.headerLinkContainer}>
      <Link href="/">
        <a className={styles.visualHighlight}>
          <h1>Parks</h1>
        </a>
      </Link>
      <ShopDropdown>
        <button className={`${styles.shopLink} ${styles.visualHighlight}`}>Shop</button>
      </ShopDropdown>
      <Link href="/about">
        <a className={styles.visualHighlight}>About</a>
      </Link>
      <Link href="/blog">
        <a className={styles.visualHighlight}>Blog</a>
      </Link>
    </nav>
  );
}
