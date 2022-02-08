import styles from "./Header.module.scss";
import HeaderLeftNav from "./HeaderLeftNav";
import HeaderRightNav from "./HeaderRightNav";

export default function Header() {
  return (
    <header className={styles.header}>
      <div id={styles.headerContentContainer}>
        <HeaderLeftNav />
        <h1>The Image Shop</h1>
        <HeaderRightNav />
      </div>
    </header>
  );
}
