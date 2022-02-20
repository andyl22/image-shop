import styles from "./ShopDropdown.module.scss";
import Dropdown from "../Dropdown/Dropdown";
import LinksList from "../LinksList/Linkslist";
import data from "../../TestData/HeaderLinks.json";

interface Props {
  children: React.ReactNode;
}

export default function ShopDropdown(props: Props) {
  const { children } = props;
  const mappedLinks = Object.keys(data).map(linkGroupName =>
    <LinksList linkGroupName={linkGroupName} key={linkGroupName} linkGroupLinks={data[linkGroupName]} />
  )
  console.log(mappedLinks)
  const dropdownContent = (
    <div className={styles.shopDropdownContainer}>
      <nav className={styles.shopNav}>
        {mappedLinks}
      </nav>
    </div>
  );

  return (
    <Dropdown expandDirection={"right"} dropdownContent={dropdownContent}>
      {children}
    </Dropdown>
  );
}
