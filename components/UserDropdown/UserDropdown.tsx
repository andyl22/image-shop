import Dropdown from "../Dropdown/Dropdown";
import styles from "./UserDropdown.module.scss";


export default function UserDropdown(props) {
  const { children } = props;
  return (
    <Dropdown useRelative={true} useClick={true} dropdownContent={<p className={styles.dropdownContent} >Test</p>}>
      {children}
    </Dropdown>
  )
}