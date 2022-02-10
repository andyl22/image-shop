import Link from "next/link";
import styles from "./LeftNav.module.scss";
import ShopDropdown from "./ShopDropdown";

export default function LeftNav() {
  return (
    <nav className={styles.headerLinkContainer}>
      <ShopDropdown>
        <Link href="/Shop">
          <a>Shop</a>
        </Link>
      </ShopDropdown>
      <Link href="/About">
        <a>About</a>
      </Link>
      <Link href="/Blog">
        <a>Blog</a>
      </Link>
    </nav>
  );
}
