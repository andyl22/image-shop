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

  const mappedChildrenToList =
    Children.count(children) > 1 ? (
      React.Children.map(children, (child, i) => {
        return <li key={i}>{child}</li>
      })
    ) : (
      <li>{children}</li>
    );

  return (
    <div className={styles.collapsibleContainer}>
      <div className={styles.controllerNode} onClick={toggleCollapsibleSection}>
        {parentNode}
        <KeyboardArrowDownIcon className={showCollapsible ? styles.reverseIcon : ""} />
      </div>
      {showCollapsible ? (
        <ul className={styles.collapsedNodes}>{mappedChildrenToList}</ul>
      ) : null}
    </div>
  );
}