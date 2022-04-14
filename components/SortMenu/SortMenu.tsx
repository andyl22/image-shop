import CollapsibleItem from "../CollapsibleItem/CollapsibleItem";
import styles from "./SortMenu.module.scss";

export default function SortMenu() {
  return (
    <div className={styles.sortMenuContainer}>
      <CollapsibleItem parentNode={<p>Test2</p>}>
        <p>Test</p>
      </CollapsibleItem>
    </div>
  );
}
