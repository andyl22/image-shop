import Link from "next/link";
import { ReactChild } from "react";
import { useAppDispatch } from "../../redux/hooks";
import { logout } from "../../redux/slices/userSlice";
import Dropdown from "../Dropdown/Dropdown";
import styles from "./UserDropdown.module.scss";

interface Props {
  children: ReactChild | ReactChild[];
}

export default function UserDropdown(props: Props) {
  const dispatch = useAppDispatch();
  const { children } = props;

  const dropdownContent = (
    <div className={styles.dropdownContent}>
      <h3>User Settings</h3>
      <nav>
        <Link href="/user/account">
          <a className={styles.menuItem}>
            Manage
          </a>
        </Link>
        <Link href="/user/preferences">
          <a className={styles.menuItem}>
            User Settings
          </a>
        </Link>
        <Link href="/user/orders">
          <a className={styles.menuItem}>
            Order History
          </a>
        </Link>
      </nav>
      <h3>Help</h3>
      <nav>
        <Link href="mission">
          <a className={styles.menuItem}>
            Our Mission
          </a>
        </Link>
        <Link href="/contact">
          <a className={styles.menuItem}>
            Contact Us
          </a>
        </Link>
        <Link href="/privacy">
          <a className={styles.menuItem}>
            Privacy
          </a>
        </Link>
      </nav>
      <button className={styles.logoutButton} onClick={() => dispatch(logout())}>
        Log out
      </button>
    </div>
  )

  return (
    <Dropdown useRelative={true} useClick={true} dropdownContent={dropdownContent}>
      {children}
    </Dropdown>
  )
}