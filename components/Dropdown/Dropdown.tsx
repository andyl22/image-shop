import styles from "./Dropdown.module.scss";
import { KeyboardEvent, MouseEvent, useState } from "react";

interface Dropdown {
  expandDirection?: "left" | "right";
  children: React.ReactNode;
  dropdownContent: React.ReactNode;
}

export default function Dropdown(props: Dropdown) {
  const { expandDirection, dropdownContent, children } = props;
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;

    if(target.tagName === "A") {
      toggleDropdown();
    }
  }

  const handleKeyPress = (e: KeyboardEvent): void => {
    const target = e.target as HTMLElement;

    if (target.tagName === "A" && e.key === "Enter") {
      e.preventDefault();
      toggleDropdown();
    }

    if (e.key === "Enter" && target.parentNode) {
      if ((target.parentNode as HTMLElement).className.match(/.*Dropdown.*/))
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
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onKeyDown={handleKeyPress}
      onClick={handleClick}
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
