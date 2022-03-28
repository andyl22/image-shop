import styles from "./Dropdown.module.scss";
import { KeyboardEvent, MouseEvent, useEffect, useState } from "react";

interface Dropdown {
  children: React.ReactNode;
  dropdownContent: React.ReactNode;
  useRelative?: boolean;
  useClick?: boolean;
}

export default function Dropdown(props: Dropdown) {
  const { dropdownContent, useRelative, useClick, children } = props;
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleClick = (e: MouseEvent) => {
    e.preventDefault();
    toggleDropdown();
  };

  const handleKeyPress = (e: KeyboardEvent): void => {
    const target = e.target as HTMLElement;

    if (target.tagName === "A" && e.key === "Enter" && !showDropdown) {
      e.preventDefault();
      toggleDropdown();
    }

    if (e.key === "Escape") setShowDropdown(!showDropdown);
  };

  const handleMouseEnter = (e: MouseEvent): void => {
    if (!showDropdown) toggleDropdown();
  };

  const handleMouseLeave = (e: MouseEvent): void => {
    if (showDropdown) toggleDropdown();
  };

  return (
    <div
      aria-expanded={showDropdown}
      className={styles.container}
      onMouseEnter={useClick ? undefined : handleMouseEnter}
      onMouseLeave={useClick ? undefined : handleMouseLeave}
      onClick={handleClick}
      onKeyDown={handleKeyPress}
    >
      {children}
      {showDropdown ? (
        <div className={useRelative ? styles.relative : ""}>
          {dropdownContent}
        </div>
      ) : <></>}
    </div>
  );
}
