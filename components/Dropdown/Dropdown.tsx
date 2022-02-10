import styles from "./Dropdown.module.scss";
import { useState } from "react";

interface Dropdown {
  expandDirection?: "left" | "right";
  children: React.ReactNode;
  dropdownContent: React.ReactNode;
}

export default function Dropdown(props: Dropdown) {
  const { expandDirection, dropdownContent, children } = props;
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
        <div
          className={
            expandDirection === "left"
              ? styles.dropdownContainerLeft
              : styles.dropdownContainerRight
          }
        >
          {dropdownContent}
        </div>
      ) : null}
    </div>
  );
}
