import Link from 'next/link';
import { ReactChild } from 'react';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import SettingsIcon from '@mui/icons-material/Settings';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import styles from './UserDropdown.module.scss';
import Dropdown from '../Dropdown/Dropdown';

interface Props {
  children: ReactChild | ReactChild[];
  logout: () => void;
}

export default function UserDropdown(props: Props) {
  const { children, logout } = props;

  const dropdownContent = (
    <div className={styles.dropdownContent}>
      <h3>User Settings</h3>
      <nav>
        <Link href="/user/account">
          <a className={styles.menuItem}>
            <AdminPanelSettingsIcon fontSize="small" />
            Manage
          </a>
        </Link>
        <Link href="/user/preferences">
          <a className={styles.menuItem}>
            <SettingsIcon fontSize="small" />
            User Settings
          </a>
        </Link>
        <Link href="/content">
          <a className={styles.menuItem}>
            <ManageSearchIcon fontSize="small" />
            Manage Content
          </a>
        </Link>
      </nav>
      <h3>Help</h3>
      <nav>
        <Link href="/about">
          <a className={styles.menuItem}>Our Mission</a>
        </Link>
        <Link href="/contact">
          <a className={styles.menuItem}>Contact Us</a>
        </Link>
        <Link href="/privacy">
          <a className={styles.menuItem}>Privacy</a>
        </Link>
      </nav>
      <button
        className={styles.logoutButton}
        onClick={logout}
        type="button"
      >
        Log out
      </button>
    </div>
  );

  return (
    <Dropdown clickControlled dropdownContent={dropdownContent}>
      {children}
    </Dropdown>
  );
}
