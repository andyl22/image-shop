import {
  KeyboardEvent,
  MouseEvent,
  ReactElement,
  useState,
} from 'react';
import styles from './Dropdown.module.scss';

interface Props {
  children: ReactElement;
  dropdownContent: ReactElement;
  clickControlled?: boolean;
}

export default function Dropdown(props: Props) {
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
    if (
      target.tagName === 'A' &&
      e.key === 'Enter' &&
      !showDropdown
    ) {
      e.preventDefault();
      toggleDropdown();
    }
    if (e.key === 'Escape') setShowDropdown(!showDropdown);
  };

  const handleMouseEnter = () => {
    if (!showDropdown) toggleDropdown();
  };

  const handleMouseLeave = () => {
    if (showDropdown) toggleDropdown();
  };

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <span
      aria-expanded={showDropdown}
      className={styles.container}
      onMouseEnter={clickControlled ? undefined : handleMouseEnter}
      onMouseLeave={clickControlled ? undefined : handleMouseLeave}
      onClick={handleClick}
      onKeyDown={handleKeyPress}
    >
      {children}
      {showDropdown ? <div>{dropdownContent}</div> : <div />}
    </span>
  );
}
