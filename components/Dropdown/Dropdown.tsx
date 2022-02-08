import styles from "./Dropdown.module.scss";
import { useState } from "react";

interface Dropdown {
  expandDirection?: boolean;
  children: React.ReactNode;
  dropdownContent: React.ReactNode;
  height?: string;
  width?: string;
}

export default function Dropdown(props: Dropdown) {
  const { expandDirection, dropdownContent, height, width, children } = props;
  const [showDropdown, setShowDropdown] = useState(true);

  const toggleDropdown = (): void => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div
      className={styles.container}
      onMouseEnter={toggleDropdown}
      onMouseLeave={toggleDropdown}
    >
      {children}
      {showDropdown ? (
        <div className={styles.dropdownContainer} style={{ height: height, width: width }}>{dropdownContent}</div>
      ) : null}
    </div>
  );
}
