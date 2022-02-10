import Link from "next/link";
import styles from "./RightNav.module.scss";

export default function RightNav() {
  return (
    <nav className={styles.headerLinkContainer}>
      <Link href="/login">
        <a>Login</a>
      </Link>
    </nav>
  );
}
