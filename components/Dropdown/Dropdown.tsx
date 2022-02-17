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

    if ((e.target as HTMLElement).tagName === "A" && e.key === "Enter") return;

    if (e.key === "Enter" && target.parentNode) {
      if ((target.parentNode as HTMLElement).className.match(/.*Dropdown.*/))
        toggleDropdown();
    }

    if (e.key === "Escape") setShowDropdown(!showDropdown);
  };

  const handleMouseOver = (e: MouseEvent): void => {
    toggleDropdown();
  };

  const disableHover = (e: MouseEvent): void => {
    setDisableMouseOver(!disableMouseOver);
  };

  return (
    <div
      aria-expanded={showDropdown}
      className={styles.container}
      onMouseEnter={disableMouseOver ? undefined : handleMouseOver}
      onMouseLeave={disableMouseOver ? undefined : handleMouseOver}
      onPointerDown={disableHover}
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
