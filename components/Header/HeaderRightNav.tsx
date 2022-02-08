import Link from "next/link";
import styles from "./HeaderRightNav.module.scss";

export default function HeaderRightNav() {
  return (
    <nav id="header-links">
      <ul className={styles.headerLinkContainer}>
        <li className={styles.headerLink}>
          <Link href="/About">
            <a>Login</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
