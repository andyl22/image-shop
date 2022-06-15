import React, { ReactNode, useState, Children, Key } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import styles from './CollapsibleItem.module.scss';

interface Props {
  parentNode: ReactNode;
  children: ReactNode | Array<ReactNode>;
  showCollapsedOnLoad: boolean;
}

export default function CollapsibleItem(props: Props) {
  const { parentNode, children, showCollapsedOnLoad } = props;
  const [showCollapsible, setShowCollapsible] = useState(
    showCollapsedOnLoad,
  );

  const toggleCollapsibleSection = () => {
    setShowCollapsible(!showCollapsible);
  };

  return (
    <div className={styles.collapsibleContainer}>
      <button
        aria-label="Close Menu"
        className={styles.collapseController}
        onClick={toggleCollapsibleSection}
        type="button"
      >
        {parentNode}
        <KeyboardArrowDownIcon
          fontSize="small"
          className={showCollapsible ? styles.reverseIcon : ''}
        />
      </button>
      <div
        className={
          showCollapsible
            ? styles.visibleNodes
            : styles.collapsedNodes
        }
      >
        {children}
      </div>
    </div>
  );
}
