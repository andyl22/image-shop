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
        <Link href="/user/account" className={styles.menuItem}>

          <AdminPanelSettingsIcon fontSize="small" />Manage
                    
        </Link>
        <Link href="/user/preferences" className={styles.menuItem}>

          <SettingsIcon fontSize="small" />User Settings
                    
        </Link>
        <Link href="/content" className={styles.menuItem}>

          <ManageSearchIcon fontSize="small" />Manage Content
                    
        </Link>
      </nav>
      <h3>Help</h3>
      <nav>
        <Link href="/about" className={styles.menuItem}>
          Our Mission
        </Link>
        <Link href="/contact" className={styles.menuItem}>
          Contact Us
        </Link>
        <Link href="/privacy" className={styles.menuItem}>
          Privacy
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
