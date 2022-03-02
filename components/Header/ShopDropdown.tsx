import styles from "./ShopDropdown.module.scss";
import Dropdown from "../Dropdown/Dropdown";
import LinksList from "../LinksList/Linkslist";
import data from "../../TestData/Sections.json";

interface Props {
  children: React.ReactNode;
}

export default function ShopDropdown(props: Props) {
  const { children } = props;

  const mappedLinks = Object.keys(data).map((linkGroupName) => {
    const formattedLink = linkGroupName
      .split(/(?=[A-Z])/g)
      .join(" ")
      .toUpperCase();
    return (
      <LinksList
        linkGroupName={formattedLink}
        key={linkGroupName}
        linkGroupLinks={data[linkGroupName as keyof typeof data]}
      />
    );
  });

  const dropdownContent = (
    <div className={styles.shopDropdownContainer}>
      <nav className={styles.shopNav}>{mappedLinks}</nav>
    </div>
  );

  return (
    <Dropdown expandDirection={"right"} dropdownContent={dropdownContent}>
      {children}
    </Dropdown>
  );
}
