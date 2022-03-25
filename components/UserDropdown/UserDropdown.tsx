import Link from "next/link";
import { ReactChild } from "react";
import Dropdown from "../Dropdown/Dropdown";
import styles from "./UserDropdown.module.scss";

interface Props {
  children: ReactChild | ReactChild[];
}

export default function UserDropdown(props: Props) {
  const { children } = props;

  const dropdownContent = (
    <div className={styles.dropdownContent}>
      <h3>User Settings</h3>
      <nav>
        <Link href="/user/account">
          <a className={styles.linkItem}>
            Manage
          </a>
        </Link>
        <Link href="/user/preferences">
          <a className={styles.linkItem}>
            User Settings
          </a>
        </Link>
        <Link href="/user/orders">
          <a className={styles.linkItem}>
            Order History
          </a>
        </Link>
      </nav>
      <h3>Help</h3>
      <nav>
        <Link href="mission">
          <a className={styles.linkItem}>
            Our Mission
          </a>
        </Link>
        <Link href="/contact">
          <a className={styles.linkItem}>
            Contact Us
          </a>
        </Link>
        <Link href="/privacy">
          <a className={styles.linkItem}>
            Privacy
          </a>
        </Link>
      </nav>
    </div>
  )

  return (
    <Dropdown useRelative={true} useClick={true} dropdownContent={dropdownContent}>
      {children}
    </Dropdown>
  )
}