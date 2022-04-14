import CollapsibleItem from "../CollapsibleItem/CollapsibleItem";
import styles from "./ItemsControlMenu.module.scss";

export default function SortMenu() {
  return (
    <div className={styles.sortMenuContainer}>
      <CollapsibleItem parentNode={<button className={styles.menuOption}>Sort By</button>}>
        <form className={styles.singleSelect}>
          <div className={styles.checkboxContainer}>
            <input type="checkbox" name="popularity" id="popularity"></input>
            <label htmlFor="popularity">Popularity</label>
          </div>
          <div>
            <input type="checkbox" name="recent" id="recent"></input>
            <label htmlFor="recent">Recent</label>
          </div>
        </form>
      </CollapsibleItem>
    </div>
  );
}
