import React, { ReactNode, useState, Children, Key } from "react";
import styles from "./CollapsibleItem.module.scss";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

interface Props {
  parentNode: ReactNode;
  children: ReactNode | Array<ReactNode>;
}

export default function CollapsibleItem(props: Props) {
  const { parentNode, children } = props;
  const [showCollapsible, setShowCollapsible] = useState(false);

  const toggleCollapsibleSection = () => {
    setShowCollapsible(!showCollapsible);
  };

  return (
    <div className={styles.collapsibleContainer}>
      <button aria-label="Close Menu" className={styles.collapseController} onClick={toggleCollapsibleSection}>
        {parentNode}
        <KeyboardArrowDownIcon fontSize="small" className={showCollapsible ? styles.reverseIcon : ""} />
      </button>
      <div className={showCollapsible ? styles.visibleNodes : styles.collapsedNodes}>{children}</div>
    </div>
  );
}
