import Link from "next/link";
import { ReactChild } from "react";
import { useAppDispatch } from "../../redux/hooks";
import { logout } from "../../redux/slices/userSlice";
import Dropdown from "../Dropdown/Dropdown";
import styles from "./UserDropdown.module.scss";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import SettingsIcon from '@mui/icons-material/Settings';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';


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
            <AdminPanelSettingsIcon fontSize = "small"/>
            Manage
          </a>
        </Link>
        <Link href="/user/preferences">
          <a className={styles.menuItem}>
            <SettingsIcon fontSize = "small"/>
            User Settings
          </a>
        </Link>
        <Link href="/user/orders">
          <a className={styles.menuItem}>
            <ManageSearchIcon fontSize = "small"/>
            Order History
          </a>
        </Link>
      </nav>
      <h3>Help</h3>
      <nav>
        <Link href="/about">
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