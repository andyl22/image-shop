import styles from "./ShopDropdown.module.scss";
import Dropdown from "../Dropdown/Dropdown";
import Link from "next/link";

interface Props {
  children: React.ReactNode;
}

export default function ShopDropdown(props: Props) {
  const { children } = props;
  const dropdownContent = (
    <div className={styles.shopDropdownContainer}>
      <nav className={styles.links}>
        <Link href="/about">
          <a>About</a>
        </Link>
      </nav>
      <div>Test</div>
    </div>
  );

  return (
    <Dropdown expandDirection={"right"} dropdownContent={dropdownContent}>
      {children}
    </Dropdown>
  );
}
