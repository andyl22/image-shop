import styles from "./Header.module.scss";
import LeftNav from "./LeftNav";
import RightNav from "./RightNav";
import Link from "next/link";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerContentContainer}>
        <LeftNav />
        <Link href="/">
          <a>
            <h1>Parks</h1>
          </a>
        </Link>
        <RightNav />
      </div>
    </header>
  );
}
