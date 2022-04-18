import styles from "./Dropdown.module.scss";
import { KeyboardEvent, MouseEvent, useState } from "react";

interface Dropdown {
  children: React.ReactNode;
  dropdownContent: React.ReactNode;
  clickControlled?: boolean;
}

export default function Dropdown(props: Dropdown) {
  const { dropdownContent, clickControlled, children } = props;
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleClick = (e: MouseEvent) => {
    e.preventDefault();
    toggleDropdown();
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    const target = e.target as HTMLElement;
    if (target.tagName === "A" && e.key === "Enter" && !showDropdown) {
      e.preventDefault();
      toggleDropdown();
    }
    if (e.key === "Escape") setShowDropdown(!showDropdown);
  };

  const handleMouseEnter = () => {
    if (!showDropdown) toggleDropdown();
  };

  const handleMouseLeave = () => {
    if (showDropdown) toggleDropdown();
  };

  return (
    <div
      aria-expanded={showDropdown}
      className={styles.container}
      onMouseEnter={clickControlled ? undefined : handleMouseEnter}
      onMouseLeave={clickControlled ? undefined : handleMouseLeave}
      onClick={handleClick}
      onKeyDown={handleKeyPress}
    >
      {children}
      {showDropdown ? <div>{dropdownContent}</div> : <div></div>}
    </div>
  );
}
