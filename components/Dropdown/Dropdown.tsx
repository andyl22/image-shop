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
  const [disableMouseOver, setDisableMouseOver] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleKeyPress = (e: KeyboardEvent): void => {
    const target = e.target as HTMLElement;

    if (target.tagName === "A" && e.key === "Enter") return;

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
    if (showDropdown && !disableMouseOver) toggleDropdown();
  }

  const handleMouseDown = (e: MouseEvent): void => {
    e.preventDefault();

    const target = e.target as HTMLElement;

    if (disableMouseOver && target.tagName === "BUTTON") {
      toggleDropdown();
      setDisableMouseOver(!disableMouseOver);
    } else if (target.tagName === "BUTTON") {
      setDisableMouseOver(!disableMouseOver);
    } else if (target.tagName === "A") {
      setDisableMouseOver(!showDropdown);
      toggleDropdown();
    }
  };

  return (
    <div
      aria-expanded={showDropdown}
      className={styles.container}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleMouseDown}
      onKeyDown={handleKeyPress}
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
