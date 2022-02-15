import styles from "./Header.module.scss";
import LeftNav from "./LeftNav";
import RightNav from "./RightNav";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerContentContainer}>
        <LeftNav />
        <h1>Parks</h1>
        <RightNav />
      </div>
    </header>
  );
}
