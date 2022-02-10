import styles from "./Header.module.scss";
import LeftNav from "./LeftNav";
import RightNav from "./RightNav";

export default function Header() {
  return (
    <header className={styles.header}>
      <div id={styles.headerContentContainer}>
        <LeftNav />
        <h1>The Image Shop</h1>
        <RightNav />
      </div>
    </header>
  );
}
