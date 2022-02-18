import Link from "next/link";
import styles from "./LeftNav.module.scss";
import ShopDropdown from "./ShopDropdown";

export default function LeftNav() {
  return (
    <nav className={styles.headerLinkContainer}>
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
