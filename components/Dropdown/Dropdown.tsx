import {
  KeyboardEvent,
  MouseEvent,
  ReactChild,
  ReactElement,
  useRef,
  useState,
} from 'react';
import styles from './Dropdown.module.scss';

interface Props {
  children: ReactChild | ReactChild[];
  dropdownContent: ReactElement | ReactElement[];
  clickControlled?: boolean;
}

export default function Dropdown(props: Props) {
  const { dropdownContent, clickControlled, children } = props;
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdown = useRef<any>();

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
    const dropdownHTML = dropdown.current as unknown as HTMLElement;
    if (showDropdown) {
      const initiateHideDropdown = setTimeout(() => {
        toggleDropdown();
      }, 500);

      const cancelHideDropdown = () => {
        clearTimeout(initiateHideDropdown);
      };

      dropdownHTML.addEventListener('mouseover', cancelHideDropdown, {
        once: true,
      });
    }
  };

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      aria-expanded={showDropdown}
      className={styles.container}
      onMouseEnter={clickControlled ? undefined : handleMouseEnter}
      onMouseLeave={clickControlled ? undefined : handleMouseLeave}
      onClick={handleClick}
      onKeyDown={handleKeyPress}
      ref={dropdown}
    >
      {children}
      {
        // eslint-disable-next-line react/jsx-no-useless-fragment
        showDropdown ? <>{dropdownContent}</> : null
      }
    </div>
  );
}
