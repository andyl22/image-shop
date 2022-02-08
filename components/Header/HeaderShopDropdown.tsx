import styles from "./HeaderShopDropdown.module.scss";
import Dropdown from "../Dropdown/Dropdown";

interface Props {
  children: React.ReactNode;
}

export default function HeaderShopDropdown(props: Props) {
  const { children } = props;
  const dropdownContent = <p>Cookies</p>;

  return (
    <Dropdown
      expandDirection={"right"}
      dropdownContent={dropdownContent}
      height="300px"
      width="400px"
    >
      {children}
    </Dropdown>
  );
}
