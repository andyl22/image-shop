import Link from "next/link";
import styles from "./HeaderLeftNav.module.scss";
import HeaderShopDropdown from "./HeaderShopDropdown";

export default function HeaderLeftNav() {
  return (
    <nav id="header-links">
      <ul className={styles.headerLinkContainer}>
        <li className={styles.headerLink}>
          <HeaderShopDropdown>
            <Link href="/Shop">
              <a>Shop</a>
            </Link>
          </HeaderShopDropdown>
        </li>
        <li className={styles.headerLink}>
          <Link href="/About">
            <a>About</a>
          </Link>
        </li>
        <li className={styles.headerLink}>
          <Link href="/Blog">
            <a>Blog</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
