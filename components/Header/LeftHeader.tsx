import Link from "next/link";
import styles from "./LeftHeader.module.scss";
import ShopDropdown from "./ShopDropdown";

export default function LeftHeader() {
  return (
    <nav className={styles.headerLinkContainer}>
      <Link href="/">
        <a>
          <h1>Parks</h1>
        </a>
      </Link>
      <ShopDropdown>
        <button className={styles.shopLink}>Shop</button>
      </ShopDropdown>
      <Link href="/about">
        <a>About</a>
      </Link>
      <Link href="/blog">
        <a>Blog</a>
      </Link>
    </nav>
  );
}
